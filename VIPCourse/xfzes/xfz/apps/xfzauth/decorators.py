#coding=utf-8
from utils import restful
from django.shortcuts import redirect


#from django.contrib.auth.decorators import login_required
#login_required 局限性，只支持传统的页面跳转，不支持ajax传递，传统的方式是做一个重定向，对于ajax来说是没有任何影响的，前端接收到返回并不能处理
#因此需要自己写一个装饰器进行限制，实现两个功能，如果是ajax请求返回未授权的错误，普通的页面请求实现重定向
#ajax上进行重定向是没有任何影响的，前端js接收到返回是不做任何处理的
def xfz_login_required(func):
    def wrapper(request,*args,**kwargs):
        if request.user.is_authenticated:
            #执行视图函数func就可以了
            return func(request,*args,**kwargs)
        else:
            if request.is_ajax():
                return restful.unauth(message="请先去登录")
            else:
                return redirect('/')
    return wrapper