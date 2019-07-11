#coding=utf-8
from haystack import indexes
from .models import News


class NewsIndex(indexes.SearchIndex,indexes.Indexable):
    text = indexes.CharField(document=True,use_template=True)
    #索引给哪个模型服务
    def get_model(self):
        return News
    #从News中提取数据的时候要返回什么样的值，可以根据时间排序等等
    def index_queryset(self, using=None):
        return self.get_model().objects.all()