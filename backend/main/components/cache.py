import sys

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6019/0",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },
    "blog_posts": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6019/0",
        "KEY_PREFIX": 'b',
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },
    "blog_posts_all": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6019/0",
        "KEY_PREFIX": 'a',
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

if 'test' in sys.argv:
    CACHES = {
        "default": {"BACKEND": "django.core.cache.backends.dummy.DummyCache"},
        "blog_posts": {"BACKEND": "django.core.cache.backends.dummy.DummyCache"},
        "blog_posts_all": {"BACKEND": "django.core.cache.backends.dummy.DummyCache"},
    }
