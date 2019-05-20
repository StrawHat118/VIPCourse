#coding=utf-8
from django import forms
from apps.forms import FormMixmin
class LoginForm(forms.Form,FormMixmin):
    telephone = forms.CharField(max_length=11)
    password = forms.CharField(max_length=10,min_length=6,error_messages={"max_length":"密码最多不能超多10个字符！","min_length":"人生的意义不是占有，而是给予"})
    remember = forms.IntegerField(required=False)



