from django.shortcuts import render
from .models import News,NewsCategory
from django.conf import settings
from utils import restful
from .serializers import NewsSerializers
def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.order_by('-pub_time')[0:count] #创建时间的顺序倒叙
    categories = NewsCategory.objects.all()
    context = {
        'newses':newses,
        'categories':categories,
    }
    return render(request,'news/index.html',context=context)

def news_list(request):
    #通过p参数来获取第几页的数据
    #并且这个p参数，是通过查询字符串的方式传过来的/new/list/?p=2
    page = int(request.GET.get('p',1))
    start = (page-1)*settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.order_by('-pub_time')[start:end]
    serializer = NewsSerializers(newses,many=True)#many代表有很多的数据可以序列化
    data = serializer.data
    # newsess = newses.values()
    # for new in newsess:
    #     print(new)
    return restful.result(data=data)

def news_detail(request,news_id):
    return render(request,'news/news-detail.html')


def course_index(request):
    return render(request,'course/course_index.html')

def course_detail(request):
    return render(request,'course/course_detail.html')
def auth(request):
    return render(request,'common/auth.html')