
function CMSNewsList() {

}

CMSNewsList.prototype.initDatePicker = function () {
    var startPicker = $("#start-picker");
    var endPicker = $("#end-picker");

    var todayDate = new Date();
    var todayStr = todayDate.getFullYear() + '/' + (todayDate.getMonth()+1) + '/' + todayDate.getDate();
    var options = {
        'showButtonPanel': true,
        'format': 'yyyy/mm/dd',//时间格式
        'startDate': '2017/6/1',//开始日期
        'endDate': todayStr,//结束日期
        'language': 'zh-CN',//语言
        'todayBtn': 'linked',//是否显示今天的按钮
        'todayHighlight': true,//今天是否高亮显示
        'clearBtn': true,//是否显示清除按钮
        'autoclose': true//是否需要自动关闭
    };
    startPicker.datepicker(options);
    endPicker.datepicker(options);
};

CMSNewsList.prototype.listenDeleteEvent = function () {
    var deleteBtns = $(".delete-btn");
    deleteBtns.click(function () {
        var btn = $(this);
        var news_id = btn.attr('data-news-id');
        xfzalert.alertConfirm({
            'text': '您是否要删除这篇新闻吗？',
            'confirmCallback': function () {
                xfzajax.post({
                    'url': '/cms/delete_news/',
                    'data': {
                        'news_id': news_id
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            window.location = window.location.href;
                            // window.location.reload()存在兼容性问题，火狐
                        }
                    }
                });
            }
        });
    });
};


CMSNewsList.prototype.run = function () {
    this.initDatePicker();
    this.listenDeleteEvent();
};

$(function () {
    var newsList = new CMSNewsList();
    newsList.run();
});