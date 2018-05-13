# pylint: skip-file
import os
from distutils.util import strtobool

USE_DATABASE = strtobool(os.environ['USE_DATABASE'])

if USE_DATABASE:

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
