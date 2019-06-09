#coding=utf-8
from django import forms
from apps.forms import FormMixmin
from django.core.cache import cache
from .models import User
class LoginForm(forms.Form,FormMixmin):
    telephone = forms.CharField(max_length=11)
    password = forms.CharField(max_length=10,min_length=6,error_messages={"max_length":"密码最多不能超多10个字符！","min_length":"人生的意义不是占有，而是给予"})
    remember = forms.IntegerField(required=False)



class RegisterForm(forms.Form,FormMixmin):
    telephone = forms.CharField(max_length=11)
    username = forms.CharField(max_length=20)
    password1 = forms.CharField(max_length=20,min_length=6,error_messages={"max_length":"密码最多不能超过10个字符！","min_length":"让你多嘴，慢慢承受吧"})
    password2 = forms.CharField(max_length=20,min_length=6,error_messages={"max_length":"密码最多不能超过10个字符！","min_length":"让你多嘴，慢慢承受吧"})
    img_captcha = forms.CharField(min_length=4,max_length=4)
    sms_captcha = forms.CharField(min_length=4,max_length=4)

    def clean(self):
        cleaned_date = super(RegisterForm,self).clean()

        password1 = cleaned_date.get('password1')
        password2 = cleaned_date.get('password2')

        if password1 != password2:
            raise forms.ValidationError('两次密码输入不一致！')

        img_captcha = cleaned_date.get('img_captcha')
        cached_img_captcha = cache.get(img_captcha)
        # if not cached_img_captcha or cached_img_captcha != img_captcha:
        #     raise forms.ValidationError("图形验证码错误")

        telephone = cleaned_date.get('telephone')
        sms_captcha = cleaned_date.get('sms_captcha')
        cached_sms_captcha = cache.get(telephone)

        if not cached_sms_captcha or cached_sms_captcha.lower() != sms_captcha.lower():
            raise forms.ValidationError("短信验证码错误")

        exist = User.objects.filter(telephone=telephone).exists()
        if exist:
            raise forms.ValidationError("该手机号已经注册！")


