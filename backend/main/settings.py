# pylint: skip-file
# flake8: noqa: ignore=F401,F403

import os

from .components.base import *
from .components.installed_apps import *
from .components.middleware import *
from .components.password_validators import *
from .components.templates import *
from .components.logging import *
from .components.i18n import *
from .components.rest_framework import *
from .components.cache import *


DEPLOYED = os.getenv('DEPLOYED', False)

if DEPLOYED:
    from .components.deployed.database import *
    from .components.deployed.rest_framework import *
else:
    from .components.local.database import *
    from .components.local.rest_framework import *

try:
    from .local_settings import *
except ImportError:
    pass
