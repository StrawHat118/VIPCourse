#coding=utf-8
from django.http import JsonResponse
class Httpcode(object):
    ok = 200
    paramserror = 400
    unauth = 401
    methoderror = 405
    servererror = 500

def result(code=Httpcode.ok,message="",data=None,kwargs=None):
    json_dict = {"code":code,"message":message,"data":data}
    #kwargs有值且是一个字典的类型
    if kwargs and isinstance(kwargs,dict) and kwargs.keys():
        json_dict.update(kwargs)
    return JsonResponse(json_dict)
def ok():
    return result()

def params_error(message="",data=None):
    return result(code=Httpcode.paramserror,message=message,data=data)

def unauth(message="",data=None):
    return result(code=Httpcode.unauth,message=message,data=data)

def method_error(message="",data=None):
    return result(code=Httpcode.methoderror,message=message,data=data)

def server_error(message="",data=None):
    return result(code=Httpcode.servererror,message=message,data=None)



