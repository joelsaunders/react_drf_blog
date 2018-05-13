from django.contrib import admin

from blog import models

models_list = [models.BlogPost]

admin.site.register(models_list)
