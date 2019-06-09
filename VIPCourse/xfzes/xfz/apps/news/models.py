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

