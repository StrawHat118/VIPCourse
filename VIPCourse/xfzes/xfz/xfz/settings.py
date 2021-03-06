"""
Django settings for xfz project.

Generated by 'django-admin startproject' using Django 2.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '+4&^4b7uq@f!aay^@o=w0&pg$-ys$)q$l6dk51#u6yk+4*lvve'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','184.170.219.63','liejingchuan.club']



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.news',
    'apps.xfzauth',
    'apps.cms',
    'apps.ueditor',
    'rest_framework',
    'debug_toolbar',
    'apps.course',
    'apps.payinfo',
    'haystack',
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'xfz.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'front','templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'builtins':[
                'django.templatetags.static'#内置标签，直接用就可以了,不需要再去load
            ]
        },
    },
]

WSGI_APPLICATION = 'xfz.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME':'xfz',
        'HOST':'127.0.0.1',
        'PORT':'3306',
        'USER':'root',
        'PASSWORD':'Aa151437',
    }
}




# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

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


AUTH_USER_MODEL = 'xfzauth.User'

#缓存配置

CACHES = {
    'default':{
        'BACKEND':'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION':'127.0.0.1:11211'
    }
}


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS =[
    os.path.join(BASE_DIR,'front','dist')
]

STATIC_ROOT = os.path.join(BASE_DIR,'static_dist')




# Qiniu配置
QINIU_ACCESS_KEY = 'eQhVp2xRuMTichslHx4dnlIqbAq5IH0QFmDJqx-O'
QINIU_SECRET_KEY = 'Mw-_7FQyn3O382OdRQ9UYRLiHYwwRTsmll3OXBwB'
QINIU_BUCKET_NAME = 'musk_118'
QINIU_DOMAIN = 'http://psid3o9h4.bkt.clouddn.com/'

# 七牛和自己的服务器，最少要配置一个
# UEditor配置
UEDITOR_UPLOAD_TO_QINIU = True
UEDITOR_QINIU_ACCESS_KEY = QINIU_ACCESS_KEY
UEDITOR_QINIU_SECRET_KEY = QINIU_SECRET_KEY
UEDITOR_QINIU_BUCKET_NAME = QINIU_BUCKET_NAME
UEDITOR_QINIU_DOMAIN = QINIU_DOMAIN


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,'media')


UEDITOR_UPLOAD_TO_SERVER = True
UEDITOR_UPLOAD_PATH = MEDIA_ROOT
UEDITOR_CONFIG_PATH = os.path.join(BASE_DIR,'front','dist','ueditor','config.json')

#一次加载多少篇文章
ONE_PAGE_NEWS_COUNT = 2



#django配置模板
INTERNAL_IPS = ['127.0.0.1']

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

DEBUG_TOOLBAR_CONFIG = {
    'JQUERY_URL':'',
}


HAYSTACK_CONNECTIONS = {
    'default': {
        # 设置haystack的搜索引擎
        'ENGINE': 'apps.news.whoosh_cn_backend.WhooshEngine',
        # 设置索引文件的位置
        'PATH': os.path.join(BASE_DIR, 'whoosh_index'),
    }
}


#增删改后自动创建索引
HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
