from django.contrib import sitemaps

from .models import BlogPost


class StaticViewSiteMap(sitemaps.Sitemap):
    def items(self):
        return ['about', 'site', 'team', 'contact']

    def location(self, item):
        return f'/{item}/'


class BlogSitemap(sitemaps.Sitemap):

    def items(self):
        return BlogPost.objects.filter(published=True)

    def location(self, item):
        return f'/{item.slug}/'
