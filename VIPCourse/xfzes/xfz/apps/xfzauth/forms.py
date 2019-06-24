#coding=utf-8
from django import forms
from apps.forms import FormMixmin
from django.core.cache import cache
from .models import User
# from django.contrib.auth import get_user_model
# User = get_user_model()
class LoginForm(forms.Form,FormMixmin):
    telephone = forms.CharField(max_length=11,min_length=6,error_messages={"max_length":"手机号码长度超出","min_length":"手机号码错误"})
    password = forms.CharField(max_length=10,min_length=6,error_messages={"max_length":"密码不能超过10位数","min_length":"密码位数不能少于6位"})
    remember = forms.IntegerField(required=False)

class RegisterForm(forms.Form,FormMixmin):
    telephone = forms.CharField(max_length=11)
    username = forms.CharField(max_length=20)
    password1 = forms.CharField(max_length=20,min_length=6,error_messages={"max_length":"密码不能超过20位"
        ,"min_length":"密码不能少于6位"})
    password2 = forms.CharField(max_length=20,min_length=6)
    img_captcha = forms.CharField(min_length=4,max_length=4)
    sms_captcha = forms.CharField(min_length=4,max_length=4)
    print(telephone,username,password1, password2,img_captcha, sms_captcha)

    def clean(self):
        cleaned_date = super(RegisterForm,self).clean()
        username = cleaned_date.get('username')
        password1 = cleaned_date.get('password1')
        password2 = cleaned_date.get('password2')
        img_captcha = cleaned_date.get('img_captcha')
        telephone = cleaned_date.get('telephone')
        sms_captcha = cleaned_date.get('sms_captcha')
        cached_img_captcha = cache.get(img_captcha)
        cached_sms_captcha = cache.get(telephone)

        print(telephone, username, password1, password2, img_captcha, sms_captcha)
        if password1 != password2:
            raise forms.ValidationError('两次密码输入不一致！')

        if not cached_img_captcha or cached_img_captcha != img_captcha:
             raise forms.ValidationError("图形验证码错误")


        if not cached_sms_captcha or cached_sms_captcha.lower() != sms_captcha.lower():
            raise forms.ValidationError("短信验证码错误")

        exist = User.objects.filter(telephone=telephone).exists()

        if exist:
            raise forms.ValidationError("该手机号已经注册！")
        return cleaned_date


