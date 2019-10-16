from django.contrib.postgres.search import SearchVector
from django.db.models.signals import post_save
from django.dispatch import receiver

from blog.models import BlogPost


@receiver(post_save, sender=BlogPost)
def update_search_vector(sender, instance, **kwargs):
    BlogPost.objects.filter(pk=instance.pk).update(search=SearchVector('title'))
