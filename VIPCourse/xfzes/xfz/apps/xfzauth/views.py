#coding=utf-8
from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from django.http import JsonResponse
from django.shortcuts import render

@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        #进行验证
        user = authenticate(request,username=telephone,password=password)
        #验证通过
        if user:
            #是否激活
            if user.is_active:
                login(request,user)
                #如果点了记住我
                if remember:
                    request.session.set_expiry(None)#None是使用django默认的过期时间-两个礼拜
                else:
                    request.session.set_expiry(0)#浏览器关闭后就过期
                # return JsonResponse({"code":200,"message":"","data":{}})
                return render(request,'news/news-detail.html')
            else:
                return JsonResponse({"code":400,"message":"您的账号已经被冻结了！","data":{}})
        else:
            return JsonResponse({"code":400,"message":"手机号或密码错误！","data":{}})
    else:
        errors = form.get_errors()
        return JsonResponse({"code":400,'message':"","data":errors})
