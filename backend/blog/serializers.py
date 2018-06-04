from django.contrib.auth.models import User, Group
from rest_framework import serializers

from blog import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class BlogPostSerializer(serializers.HyperlinkedModelSerializer):
    created = serializers.DateTimeField(format='%d %b %Y')

    class Meta:
        model = models.BlogPost
        fields = ('id', 'title', 'body', 'author', 'picture', 'created', 'description', 'slug')
