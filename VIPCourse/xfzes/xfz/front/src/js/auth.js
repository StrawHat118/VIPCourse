//点击登录按钮，弹出模块对话框
// $(function () {
//     $("#btn").click(function () {
//         $(".mask-wrapper").show();
//     })
//     $(".close-btn").click(function () {
//         $(".mask-wrapper").hide();
//     })
// })

$(function () {
    $(".switch").click(function () {
        var scrollWrapper = $(".scrool-wrapper");
        var currentLeft = scrollWrapper.css("left");
        currentLeft = parseInt(currentLeft);//解析为整型
        if (currentLeft <0){
            scrollWrapper.animate({"left":'0'})//有切换动画
        }
        else {
            scrollWrapper.animate({"left":"-400px"});
        }

    })

})
//构造函数
function Auth() {
    //在这个类中很多地方都会用到，所以定义成类的属性
    var self = this;//后期不会产生冲突，this在不同的函数中代表不同的对象
    self.maskWrapper = $('.mask-wrapper');

}
//构造函数绑定方法
//run方法是类或对象的入口，包括监听事件ajax事件
Auth.prototype.run = function () {
    var self = this;
    self.listenShowHideEvent();//在run方法中才会执行
}

Auth.prototype.showEvent = function(){
    var self = this;
    self.maskWrapper.show();

};

Auth.prototype.hideEvent = function(){
    var self = this;
    self.maskWrapper.hide();
};

Auth.prototype.listenShowHideEvent =
    function(){
        var self = this;
        var signinBtn = $('.signin-btn');
        var signupBtn = $('.signup-btn');
        var closeBtn = $('.close-btn');
        var scrollWrapper = $('.scrool-wrapper');
        signinBtn.click(function () {
            self.showEvent();
            scrollWrapper.css({"left":0});
        })

        signupBtn.click(function () {
            self.showEvent();
            scrollWrapper.css({"left":-400});
        })

        closeBtn.click(function () {
            self.hideEvent();
        })
    };



//整个网页全都加载出来后才会调用该函数
$(function () {
    var auth = new Auth();
    auth.run();
})