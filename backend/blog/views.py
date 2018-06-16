import json
import zlib
from distutils.util import strtobool

from django.core.cache import caches
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.response import Response

from blog import serializers, models
from blog.signals import cache_instance


def find_relations(model):
    select_related_fields = set()
    prefetch_related_fields = set()

    for field in model._meta.get_fields():

        if field.many_to_many or field.one_to_many:
            prefetch_related_fields.add(field.name)

        elif field.one_to_one or field.many_to_one:
            select_related_fields.add(field.name)

    return select_related_fields, prefetch_related_fields


class DynamicFieldsMeta(type):

    def __new__(mcs, name, bases, attrs):
        new_class = super().__new__(mcs, name, bases, attrs)
        queryset = getattr(new_class, 'queryset')

        if queryset is not None:
            model = queryset.model
            new_class.select_related_fields, new_class.prefetch_related_fields = find_relations(model)

        return new_class


class DynamicFieldsViewSet(viewsets.ModelViewSet, metaclass=DynamicFieldsMeta):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.custom_query_fields = set()

    def get_query_fields(self):
        custom_query_fields = set()
        raw_fields = self.request.query_params.getlist('fields')

        for item in raw_fields:
            custom_query_fields.update(item.split(','))

        return custom_query_fields

    def get_queryset(self, no_dynamic_prefetch=False):
        queryset = self.queryset
        self.custom_query_fields.update(self.get_query_fields())

        if no_dynamic_prefetch:
            return queryset.all()

        if '__all__' not in self.custom_query_fields:
            select_related = self.select_related_fields & self.custom_query_fields
            prefetch_related = self.prefetch_related_fields & self.custom_query_fields

        else:
            prefetch_related = self.prefetch_related_fields
            select_related = self.select_related_fields

        return queryset.select_related(*select_related).prefetch_related(*prefetch_related).all()

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, fields=self.custom_query_fields, **kwargs)


class BlogPostFilterSet(FilterSet):

    class Meta:
        model = models.BlogPost
        fields = ('tags__name',)


class BlogPostViewSet(DynamicFieldsViewSet):
    queryset = models.BlogPost.objects.all().order_by('-created')
    serializer_class = serializers.BlogPostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    lookup_field = 'slug'
    filter_class = BlogPostFilterSet

    @staticmethod
    def get_cached_object(lookup, cache_name, decompress=True):
        cached_object = caches[cache_name].get(lookup)

        if cached_object and decompress:
            return json.loads(zlib.decompress(cached_object), encoding='utf-8')
        return cached_object

    def get_queryset(self, no_dynamic_prefetch=False):
        return super(BlogPostViewSet, self).get_queryset(no_dynamic_prefetch).filter(published=True)

    def get_object(self):
        instance = super(BlogPostViewSet, self).get_object()
        cache_instance(
            instance=instance,
            serializer=self.get_serializer_class(),
            serializer_params={'fields': '__all__'},
            cache_name='blog_posts'
        )
        return instance

    @staticmethod
    def pop_fields(post, query_fields):
        if '__all__' in query_fields:
            return post

        pruned_dict = {}

        for field, value in post.items():
            if field in query_fields:
                pruned_dict[field] = value

        return pruned_dict

    def retrieve(self, request, *args, **kwargs):

        if strtobool(request.query_params.get('use_cache', 'false')):

            cached_post = self.get_cached_object(
                self.kwargs[self.lookup_field],
                cache_name='blog_posts'
            )

            if cached_post:
                query_fields = self.get_query_fields()
                if query_fields:
                    cached_post = self.pop_fields(cached_post, query_fields)
                return Response(cached_post, status=status.HTTP_200_OK)

        return super().retrieve(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset(no_dynamic_prefetch=True))
        page = self.paginate_queryset(queryset.values_list(self.lookup_field, flat=True))
        query_fields = self.get_query_fields()

        if page is not None:
            results = []
            cache_misses = []

            for index, lookup_value in enumerate(page):
                cached_result = self.get_cached_object(lookup_value, cache_name='blog_posts')

                if cached_result:
                    cached_result = self.pop_fields(cached_result, query_fields)

                elif cached_result is None:
                    cache_misses.append((index, lookup_value))

                results.append(cached_result)

                filter_kwargs = {
                    f'{self.lookup_field}__in': [value for _, value in cache_misses]
                }

                for cache_miss, instance in zip(cache_misses, self.get_queryset().filter(**filter_kwargs)):
                    serialized_instance = cache_instance(
                        instance=instance,
                        serializer=self.get_serializer_class(),
                        serializer_params={'fields': '__all__'},
                        cache_name='blog_posts'
                    )
                    results[cache_miss[0]] = self.pop_fields(serialized_instance, query_fields)

            return self.get_paginated_response(results)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
