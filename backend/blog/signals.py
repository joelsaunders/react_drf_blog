import json
import zlib

from django.core.cache import caches
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver

from blog.models import BlogPost
from blog.serializers import BlogPostSerializer


def cache_object(obj, cache_name, cache_key):
    compressed_all = zlib.compress(json.dumps(obj, separators=(',', ':')).encode('utf-8'), 9)
    caches[cache_name].set(cache_key, compressed_all, timeout=None)


def cache_post_instance(instance):
    serialized_object = BlogPostSerializer(instance=instance, fields='__all__').data
    cache_object(serialized_object, 'blog_posts', instance.slug)


def cache_all_posts(queryset=None):
    queryset = BlogPost.objects.filter(published=True).order_by('-created') if queryset is None else queryset
    serialized_all = BlogPostSerializer(queryset, many=True).data
    cache_object(serialized_all, 'blog_posts_all', '__all__')


@receiver(post_save, sender=BlogPost)
def cache_serialized_post(sender, instance, **kwargs):
    cache_post_instance(instance)
    cache_all_posts()


@receiver(post_delete, sender=BlogPost)
def delete_cached_post(sender, instance, **kwargs):
    caches['blog_posts'].delete(instance.slug)
