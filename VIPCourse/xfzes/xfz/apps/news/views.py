from django.shortcuts import render
from .models import News,NewsCategory,Banner
from django.conf import settings
from utils import restful
from .serializers import NewsSerializers,CommentSerializers
from django.http import Http404
from .forms import PublicCommentForm
from .models import Comment
from apps.xfzauth.decorators import xfz_login_required
def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    #select_related 查询这两个属性的外键，提前查询
    newses = News.objects.select_related('category','author').all()[0:count] #创建时间的顺序倒叙
    categories = NewsCategory.objects.all()#没有发生外键查询，所以不需要进行优化，很少变动的分类可以放到缓存中
    banners = Banner.objects.all()
    context = {
        'newses':newses,
        'categories':categories,
        'banners': banners
    }
    return render(request,'news/index.html',context=context)

def news_list(request):
    #通过p参数来获取第几页的数据
    #并且这个p参数，是通过查询字符串的方式传过来的/new/list/?p=2
    page = int(request.GET.get('p',1))
    category_id = int(request.GET.get('category_id',0))
    start = (page-1)*settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    if category_id ==0:
        newses = News.objects.select_related('category','author').all()[start:end]
    else:
        newses = News.objects.select_related('category','author').filter(category_id=category_id)[start:end]
    serializer = NewsSerializers(newses,many=True)#many代表有很多的数据可以序列化,代表newses是个queryset对象
    data = serializer.data
    # newsess = newses.values()
    # for new in newsess:
    #     print(new)
    return restful.result(data=data)

def news_detail(request,news_id):
    try:
        news = News.objects.select_related('category','author').prefetch_related("comments__author").get(pk=news_id)
        context = {
            'news': news
        }
        return render(request, 'news/news-detail.html', context=context)
    except News.DoesNotExist:#如果新闻不存在
        raise Http404
@xfz_login_required
def public_comment(request):
    form = PublicCommentForm(request.POST)
    if form.is_valid():
        try:
            news_id = form.cleaned_data.get('news_id')
            content = form.cleaned_data.get('content')
            news = News.objects.get(pk=news_id)  # 判断新闻的id是否真的存在数据库中，最好加一个异常处理
            comment = Comment.objects.create(content=content,news=news,author=request.user)
        except:
            raise Http404
            #拿到新闻后，创建一个评论的模型
        #返回评论的内容和作者的用户名，但是作者的用户名是通过外间的形式引用的，所以要通过序列化还转化成json
        #告诉序列化需要哪些字段
        serizlize = CommentSerializers(comment)#comment只是一个commen对象，所以不需要用many
        return restful.result(data=serizlize.data)
    else:
        return restful.params_error(message=form.get_errors())


def course_index(request):
    return render(request,'course/course_index.html')

def course_detail(request):
    return render(request,'course/course_detail.html')
def auth(request):
    return render(request,'common/auth.html')