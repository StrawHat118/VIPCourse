#coding=utf-8
from django.urls import path
from . import views

app_name = 'news' #命名空间
urlpatterns = [
    path('course_index/',views.course_index,name='course_index'),
    path('course_detail/',views.course_detail,name='course_detail'),
    path('auth/',views.auth,name='auth'),
    path('<int:news_id>/',views.news_detail,name='news_detail')
]