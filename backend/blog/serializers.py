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
    created = serializers.DateTimeField(format='%d %b %Y')
    tags = TagSerializer(many=True, read_only=True)
    author = serializers.CharField(source='author.username')

    class Meta:
        model = models.BlogPost
        exclude = ('id',)
