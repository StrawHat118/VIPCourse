#coding=utf-8
from apps.forms import FormMixmin
from apps.news.models import News,Banner
from apps.course.models import Course
from django import forms


class EditNewsCategoryForm(forms.Form):
    pk = forms.IntegerField(error_messages={"required":"必须传入分类的id!"})
    name = forms.CharField(max_length=100)


class WriteNewsForm(forms.ModelForm,FormMixmin):#FormMixmin里面是错误的信息
    #category默认的字段是不需要的，所以要重新定义一个字段
    category = forms.IntegerField()
    class Meta:
        model = News #告诉ModelForm用的是哪个model
        #哪些字段是需要的和不需要的
        exclude = ['category','author','pub_time'] #category因为上传的是一个整型而不是一个字段，所以需要重新定义，作者就是当前用户，创建时间是自动获取的


class EditNewsForm(forms.ModelForm,FormMixmin):
    category = forms.IntegerField()
    pk = forms.IntegerField()
    class Meta:
        model = News
        exclude = ['category','author','pub_time']


class AddBannerForm(forms.ModelForm,FormMixmin):
    class Meta:
        model = Banner
        fields = ('priority','link_to','image_url')



class AddBannerForm(forms.ModelForm,FormMixmin):
    class Meta:
        model = Banner
        fields = ('priority','link_to','image_url')

class EditBannerForm(forms.ModelForm,FormMixmin):
    pk = forms.IntegerField()
    class Meta:
        model = Banner
        fields = ('priority','link_to','image_url')


class PubCourseForm(forms.ModelForm, FormMixmin):
    category_id = forms.IntegerField()
    teacher_id = forms.IntegerField()
    class Meta:
        model = Course
        exclude = ("category","teacher")