#coding=utf-8
from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from django.http import JsonResponse
from django.shortcuts import render,redirect,reverse
from utils import restful
from utils.captcha.xfzcaptcha import Captcha
from io import BytesIO
from django.http import HttpResponse
from django.core.cache import cache
from utils import smssender

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
                return restful.result()
            else:
                # return JsonResponse({"code":400,"message":"您的账号已经被冻结了！","data":{}})
                return restful.unauth(message="您的账号已经被冻结")
        else:
            # return JsonResponse({"code":400,"message":"手机号或密码错误！","data":{}})
            return restful.params_error(message="手机号或密码错误")
    else:
        errors = form.get_errors()
        # return JsonResponse({"code":400,'message':"","data":errors})
        return restful.params_error(message=errors)

def logout_view(request):
    logout(request)#这样就退出登录了
    return redirect(reverse('index'))

def img_captcha(request):
    text,image = Captcha.gene_code()
    out = BytesIO()
    image.save(out,'png')#调用save方法之后，文件指针的位置在最后
    out.seek(0)#将文件指针移动到文件最开始的位置，防止read()的方法读取不到文件
    #HttpResponse默认的类型是字符串
    response = HttpResponse(content_type='image/png')
    response.write(out.read())#out.read()会从当前文件指针所在的位置往后读
    response['Content-length'] = out.tell()#tell方法会告诉文件指针所在的位置，该位置就是图片的大小
    return response

def sms_captcha(request):
    telephone = request.GET.get('telephone')
    code = Captcha.gene_text()
    cache.set(telephone,code,5*60)
    print('短信验证码:',code)
    result = smssender.send(telephone,code)
    if result:
        return restful.ok()
    else:
        return restful.params_error(message="短信验证码发送失败！")

