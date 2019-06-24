from django.db import models

class NewsCategory(models.Model):
    name = models.CharField(max_length=100)

class News(models.Model):
    title = models.CharField(max_length=100)
    desc = models.CharField(max_length=100)
    thumbnail = models.URLField()
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now_add=True)
    # on_delete表示分类删除后，News该怎么做，set_null保留为空，null = true表示为空也行
    category = models.ForeignKey('NewsCategory',on_delete=models.SET_NULL,null=True)
    author = models.ForeignKey('xfzauth.User',on_delete=models.SET_NULL,null=True)

    class Meta:
        ordering = ['-pub_time']


class Comment(models.Model):
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now_add=True)#获取当前时间
    news = models.ForeignKey("News",on_delete=models.CASCADE,related_name='comments')#级联删除 releated_name表示以后通过news去访问Comment可以通过comments去访问，
    #如果没有指定，就默认为Comment的小写形式加set == comment_set
    author = models.ForeignKey("xfzauth.User",on_delete=models.CASCADE)#作者被删除，评论被删除
    class Meta:
        ordering = ['-pub_time']




class Banner(models.Model):
    priority = models.IntegerField(default=0)
    image_url = models.URLField()
    link_to = models.URLField()
    pub_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-priority']