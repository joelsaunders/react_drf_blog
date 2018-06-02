import uuid

from django.contrib.auth.models import User
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


class BlogPost(AutoTimestamp):
    """
    Post model for blog section of website
    """
    slug = models.SlugField(max_length=50, db_index=True, default=uuid.uuid4())
    title = models.CharField(max_length=100)
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    picture = models.TextField()
    description = models.TextField(default='No post description')
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
