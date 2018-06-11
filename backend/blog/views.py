
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework import permissions

from blog import serializers, models


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

    def get_queryset(self):
        queryset = self.queryset
        self.custom_query_fields.update(self.get_query_fields())

        if '__all__' not in self.custom_query_fields:
            select_related = self.select_related_fields & self.custom_query_fields
            prefetch_related = self.prefetch_related_fields & self.custom_query_fields

        else:
            prefetch_related = self.prefetch_related_fields
            select_related = self.select_related_fields

        return queryset.select_related(*select_related).prefetch_related(*prefetch_related).all()

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, fields=self.custom_query_fields, **kwargs)


class BlogPostViewSet(DynamicFieldsViewSet):
    queryset = models.BlogPost.objects.all().order_by('-created')
    serializer_class = serializers.BlogPostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    lookup_field = 'slug'
