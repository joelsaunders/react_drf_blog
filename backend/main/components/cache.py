import sys

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6019/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

if 'test' in sys.argv:
    CACHES = {
        "default": {"BACKEND": "django.core.cache.backends.dummy.DummyCache"},
    }
