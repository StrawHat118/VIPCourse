#encoding: utf-8

from django.urls import path
from . import views

app_name = 'payinfo'

urlpatterns = [
    path('',views.index,name='index'),
    # path('notify_url/',views.notify_view,name='notify_view'),
    # path('download/',views.download,name='download')
]