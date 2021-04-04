"""
Django settings for demsausage project.

Generated by 'django-admin startproject' using Django 1.10.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os

import sentry_sdk
from corsheaders.defaults import default_headers
from sentry_sdk.integrations.django import DjangoIntegration

from demsausage.util import get_env

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env("SECRET_KEY")

# Security
SECURE_SSL_REDIRECT = True
# https://stackoverflow.com/a/22284717
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = tuple(get_env("ALLOWED_HOSTS_AND_WHITELIST").split(","))
CSRF_TRUSTED_ORIGINS = tuple(get_env("ALLOWED_HOSTS_AND_WHITELIST").split(","))
ALLOWED_HOSTS = get_env("ALLOWED_HOSTS_AND_WHITELIST").replace("https://", "").split(",")

SESSION_COOKIE_DOMAIN = get_env("SESSION_COOKIE_DOMAIN")
CSRF_COOKIE_DOMAIN = get_env("CSRF_COOKIE_DOMAIN")

CORS_ALLOW_HEADERS = default_headers + (
    "Content-Disposition",
)

CONN_MAX_AGE = 10

if get_env("ENVIRONMENT") == "PRODUCTION":
    DEBUG = False

    STATIC_ROOT = "/app/static"

    LOGGING = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "verbose": {
                "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
            },
        },
        "handlers": {
            "file": {
                "level": "INFO",
                "class": "logging.FileHandler",
                "filename": "/app/logs/django.log",
                "formatter": "verbose",
            },
        },
        "loggers": {
            "django": {
                "handlers": ["file"],
                "level": "INFO",
                "propagate": True,
            },
        },
    }
else:
    DEBUG = True

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "static")
    ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'social_django',
    'demsausage.app',
    'rest_framework',
    'rest_framework_gis',
    'corsheaders',
    'simple_history',
    'django_filters',
    'rest_framework_swagger',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    # 'social_core.pipeline.user.create_user',
    'demsausage.app.auth.create_user',
    # 'ealgis.ealauth.pipeline.do_something',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'demsausage.app.auth.get_avatar',
)

ROOT_URLCONF = 'demsausage.urls'

LOGIN_REDIRECT_URL = get_env("SITE_BASE_URL")
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

SOCIAL_AUTH_TWITTER_KEY = get_env('SOCIAL_AUTH_TWITTER_KEY')
SOCIAL_AUTH_TWITTER_SECRET = get_env('SOCIAL_AUTH_TWITTER_SECRET')

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = get_env('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = get_env('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')

SOCIAL_AUTH_FACEBOOK_KEY = get_env('SOCIAL_AUTH_FACEBOOK_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = get_env('SOCIAL_AUTH_FACEBOOK_SECRET')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

CACHES = {
    'default': {
        'BACKEND': 'djpymemcache.backend.PyMemcacheCache',
        'LOCATION': get_env('MEMCACHED_LOCATION'),
        'TIMEOUT': None,
        'KEY_PREFIX': 'demsausage',
    }
}


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

# DATABASES = {}
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'OPTIONS': {
            # Assumes PostGIS was installed with defaults (i.e. its in the public schema)
            # https://stackoverflow.com/a/26289219/7368493
            'options': '-c search_path={},public,topology'.format(get_env('DB_SCHEMA'))
        },
        'NAME': get_env('DB_NAME'),
        'USER': get_env('DB_USERNAME'),
        'PASSWORD': get_env('DB_PASSWORD'),
        'HOST': get_env('DB_HOST'),
        'PORT': get_env('DB_PORT'),
    },
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Django REST Framework

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-au'

TIME_ZONE = 'Australia/Perth'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/api/static/'

# Swagger

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': False,
    'USE_SESSION_AUTH': False,
    'APIS_SORTER': 'alpha',
    'DOC_EXPANSION': 'list',
    'OPERATIONS_SORTER': 'alpha',
}

# Sentry SDK

sentry_sdk.init(
    dsn=get_env("RAVEN_URL"),
    integrations=[DjangoIntegration()],
    send_default_pii=True,
    environment=get_env("ENVIRONMENT")
)

with sentry_sdk.configure_scope() as scope:
    scope.level = "warning"
    scope.set_extra("site", get_env("RAVEN_SITE_NAME"))


# Project-specific settings
