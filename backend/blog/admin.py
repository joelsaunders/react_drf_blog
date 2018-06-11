from django.contrib import admin

from blog import models


@admin.register(models.BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created', 'modified',)


@admin.register(models.Tag)
class Tag(admin.ModelAdmin):
    list_display = ('name',)
