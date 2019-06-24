function NewsList() {

}


NewsList.prototype.listenSubmitEvent = function(){
    var submitBtn = $(".submit-comment-btn");
    var textarea = $("textarea[name='comment']")
    submitBtn.click(function () {
        var content = textarea.val();
        var news_id = submitBtn.attr('data-news-id');
        xfzajax.post({
            'url':'/news/public_comment/',
            'data':{
                'content':content,
                'news_id':news_id,
            },
            'success':function (result) {
                if(result['code']===200){
                    console.log('success_details:', window.messageBox);
                    var comment = result['data']
                    //通过arttenplate将comment转化成html格式渲染到这里
                    var tpl = template('comment-item',{"comment":comment });
                    //获取列表的容器
                    var commentListGroup = $(".comment-list");
                    commentListGroup.prepend(tpl);//prepend追加到最前方
                    window.messageBox.showSuccess('评论发表成功');
                    textarea.val("");
                }else {
                    window.messageBox.showError(result['message'])
                }
            }
        })
    });
}




NewsList.prototype.run = function () {
    var self = this;
    self.listenSubmitEvent();
}


$(function () {
    var newList = new NewsList();
    newList.run();
})