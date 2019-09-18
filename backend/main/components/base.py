import os
from distutils.util import strtobool  # pylint: disable=E0611,F0401


ALLOWED_HOSTS = ['*']

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ENV = os.getenv('ENV', 'local').lower()

DEBUG = strtobool(os.getenv('DEBUG', "false"))

ROOT_URLCONF = 'main.urls'

SECRET_KEY = os.getenv('SECRET_KEY', 'not secure at all')

SESSION_COOKIE_AGE = 3600 if ENV == 'prod' else 86400

SESSION_COOKIE_SECURE = ENV != 'local'

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

WSGI_APPLICATION = 'main.wsgi.application'

CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://k3stest.thebookofjoel.com',
]
