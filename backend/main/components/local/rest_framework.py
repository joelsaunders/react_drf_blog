from django.conf import settings

REST_FRAMEWORK = settings.REST_FRAMEWORK

REST_FRAMEWORK.update({
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_METADATA_CLASS': None,
})
