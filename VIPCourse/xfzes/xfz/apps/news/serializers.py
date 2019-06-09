#coding=utf-8
from rest_framework import serializers
from .models import News,NewsCategory
from apps.xfzauth.serializers import UserSerializer

#因为category返回的是id，想要内容的话，要重新定义一个category的类
class NewsCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields =('id','name')





class NewsSerializers(serializers.ModelSerializer):
    category = NewsCategorySerializers()
    author = UserSerializer()
    class Meta:
        model = News
        fields = ('id','title','desc','thumbnail','category','author','pub_time')