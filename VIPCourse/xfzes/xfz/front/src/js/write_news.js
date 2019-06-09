



 function News() {

 }


 News.prototype.initEditor = function(){
    window.ue = UE.getEditor('editor',{
        'initialFrameHeight':400,
        'serverUrl':'/ueditor/upload/',
    });//全局的一个变量
 }

 News.prototype.listenQiniuUploadFileEvent = function(){
    var self = this;
    var uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
       //和七牛云进行交互，首先要有token
        var file = this.files[0];
        xfzajax.get({
            'url':'/cms/qntoken/',
            'success':function (result) {
                if(result['code']=== 200){
                    var token = result['data']['token']
                    //a.jpg = ['a','jpg']
                    //192213033.jpg
                    var key = (new Date().getTime() +'.'+ file.name.split('.')[1]);
                    var putExtra = {
                        fname: key,
                        params:{},
                        mimeType:['image/png','image/jpeg','image/gif']//限制文件上传的格式
                    }
                    var config = {
                        userCdnDomain:true,
                        retryCount:6,
                        region:qiniu.region.z0
                    };
                    var observable = qiniu.upload(file,key,token,putExtra,config);
                    observable.subscribe({ //
                        'next': self.handleFileUploadProgress,//此处不是要执行这个函数，后面会去调用
                        'error':self.handleFileUploadError,
                        'complete':self.handleFileUploadComplete,
                    })


                }
            }
        })
    });
 };


News.prototype.handleFileUploadProgress = function(response){
    var total = response.total;
    var percent = total.percent;
    var percentText = percent.toFixed(0)+'%';//toFixed(0)表示后面不需要任何小数
    var progressGroup = $('#progress-group');
    var progressBar = $('.progress-bar');
    progressBar.css({"width":0});//进度条初始化为0%
    progressGroup.show();//然后展示进度条
    progressBar.css({"width":percentText});
    progressBar.text(percentText);
    // console.log(percentText);
    // progressBar.css({"width":0});


}

News.prototype.handleFileUploadError = function(error){
    console.log(error.message);
    var progressGroup = $("#progress-group");//上传失败了，进度条也要隐藏掉
    progressGroup.hide();
}

News.prototype.handleFileUploadComplete = function(response){
    console.log(response);
    var progressGroup = $("#progress-group");
    progressGroup.hide();
    var domain = 'http://psid3o9h4.bkt.clouddn.com/';
    var filename = response.key;
    var url = domain + filename;
    var thumbnailInput = $("input[name='thumbnail']");
    thumbnailInput.val(url);
}

News.prototype.listenSubmitEvent = function(){
    var submitBtn = $('#submit-btn');
    submitBtn.click(function () {
        event.preventDefault();//阻止点击的默认行为，不能使用传统的表单发送事件，因为此处用了ueditor，通过js获取内容通过ajax发送过去
        var title = $("input[name='title']").val();
        var category = $("select[name='category']").val();
        var desc = $("input[name='desc']").val();
        var thumbnail = $("input[name='thumbnail']").val();
        var content = window.ue.getContent();
        xfzajax.post({
            'url':'/cms/write_news/',
            'data':{
                'title':title,
                'category':category,
                'desc':desc,
                'thumbnail':thumbnail,
                'content':content,
            },
            'success':function (result) {
                if(result['code']===200){
                    xfzalert.alertSuccess('恭喜！新闻发表成功',function () {
                        window.location.reload();
                    })
                }
            }

        })
    })
}

 News .prototype.run = function () {
    var self = this;
    // self.listenUploadFileEvent();
     self.listenQiniuUploadFileEvent();
     self.initEditor();
     self.listenSubmitEvent();
 }
 
 $(function () {
     var news = new News();
     news.run();

 })