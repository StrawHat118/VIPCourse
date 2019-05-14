from django.shortcuts import render

def index(request):
    return render(request,'news/index.html')

def course_index(request):
    return render(request,'course/course_index.html')

def course_detail(request):
    return render(request,'course/course_detail.html')
def auth(request):
    return render(request,'common/auth.html')