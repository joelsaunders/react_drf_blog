from django.contrib.auth.models import User
from rest_framework import serializers

from blog import models


class DynamicFieldsSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', set())

        super().__init__(*args, **kwargs)

        if fields and '__all__' not in fields:
            all_fields = set(self.fields.keys())
            for not_requested in all_fields - set(fields):
                self.fields.pop(not_requested)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = ('name',)


class BlogPostSerializer(DynamicFieldsSerializer):
    created = serializers.DateTimeField(format='%d %b %Y', required=False)
    tags = TagSerializer(many=True, read_only=True)
    author = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )

    class Meta:
        model = models.BlogPost
        exclude = ('id',)


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = User
