import uuid

from django.contrib.auth.models import User
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.db import models
from django.utils.timezone import now


class AutoTimestamp(models.Model):
    """
    provides created and last modified dates
    """
    created = models.DateTimeField(db_index=True, default=now)
    modified = models.DateTimeField(db_index=True, auto_now=True)

    class Meta:
        abstract = True


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class BlogPost(AutoTimestamp):
    """
    Post model for blog section of website
    """
    slug = models.SlugField(max_length=50, default=uuid.uuid4, unique=True)
    title = models.CharField(max_length=100, db_index=True)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    picture = models.TextField()
    description = models.TextField(default='No post description')
    published = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, related_name='blog_posts', blank=True)
    search = SearchVectorField(null=True)

    class Meta:
        indexes = [
            GinIndex(fields=['search']),
        ]

    def __str__(self):
        return self.slug
