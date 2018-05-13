# pylint: skip-file
import os
from distutils.util import strtobool


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': 'master.cloudsql',
        'PORT': 3306,
    },
}
