#coding=utf-8
#因为要获取两个参数，所以定义一个表单
from django import forms
from apps.forms import FormMixmin

class PublicCommentForm(forms.Form,FormMixmin):
    content = forms.CharField()
    news_id = forms.IntegerField()
