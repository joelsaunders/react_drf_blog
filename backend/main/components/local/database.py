# pylint: skip-file

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'blog',
        'USER': 'blog_user',
        'PASSWORD': 'root',
        'HOST': 'postgres',
        'PORT': '5432',
    }
}
