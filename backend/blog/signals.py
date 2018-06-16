import json
import zlib

from django.core.cache import caches
from django.db.models.signals import post_save, m2m_changed
from django.db.models.signals import post_delete
from django.dispatch import receiver

from blog.models import BlogPost
from blog.serializers import BlogPostSerializer


def cache_object(obj, cache_name, cache_key):
    compressed_all = zlib.compress(json.dumps(obj, separators=(',', ':')).encode('utf-8'), 9)
    caches[cache_name].set(cache_key, compressed_all, timeout=None)


def cache_instance(instance, serializer, serializer_params, cache_name):
    serialized_object = serializer(instance=instance, **serializer_params).data
    cache_object(serialized_object, cache_name, instance.slug)
    return serialized_object


@receiver(m2m_changed, sender=BlogPost.tags.through)
def cache_serialized_post_m2m(sender, instance, **kwargs):
    if kwargs['reverse']:
        instances = instance.blog_posts.all()
    else:
        instances = [instance]
    for instance in instances:
        cache_instance(
            instance=instance,
            serializer=BlogPostSerializer,
            serializer_params={'fields': '__all__'},
            cache_name='blog_posts'
        )


@receiver(post_save, sender=BlogPost)
def cache_serialized_post(sender, instance, **kwargs):
    cache_instance(
        instance=instance,
        serializer=BlogPostSerializer,
        serializer_params={'fields': '__all__'},
        cache_name='blog_posts'
    )


@receiver(post_delete, sender=BlogPost)
def delete_cached_post(sender, instance, **kwargs):
    caches['blog_posts'].delete(instance.slug)
