//点击登录按钮，弹出模块对话框
// $(function () {
//     $("#btn").click(function () {
//         $(".mask-wrapper").show();
//     })
//     $(".close-btn").click(function () {
//         $(".mask-wrapper").hide();
//     })
// })

//构造函数
function Auth() {
    //在这个类中很多地方都会用到，所以定义成类的属性
    var self = this;//后期不会产生冲突，this在不同的函数中代表不同的对象
    self.maskWrapper = $('.mask-wrapper')
    self.scrollWrapper = $(".scrool-wrapper");


}
//构造函数绑定方法
//run方法是类或对象的入口，包括监听事件ajax事件
Auth.prototype.run = function () {
    var self = this;
    self.listenShowHideEvent();//在run方法中才会执行
    self.listenSwitchEvent();
    self.listenSigninEvent();
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
        signinBtn.click(function () {
            self.showEvent();
            self.scrollWrapper.css({"left":0});
        });

        signupBtn.click(function () {
            self.showEvent();
            self.scrollWrapper.css({"left":-400});
        });

        closeBtn.click(function () {
            self.hideEvent();
        })
    };
//监听切换
Auth.prototype.listenSwitchEvent =
    function(){
        var self = this;
        var switcher = $('.switch')
        switcher.click(function () {

        var currentLeft = self.scrollWrapper.css("left");
        currentLeft = parseInt(currentLeft);//解析为整型
        if (currentLeft <0){
            self.scrollWrapper.animate({"left":'0'})//有切换动画
        }
        else {
            self.scrollWrapper.animate({"left":"-400px"});
        }

    })
    }

//监听登录事件
Auth.prototype.listenSigninEvent =
    function(){
        var self = this;
        var signinGroup = $('.signin-group');
        var telephoneInput = signinGroup.find("input[name='telephone']");
        var passwordInput = signinGroup.find("input[name='password']");
        var rememberInput = signinGroup.find("input[name='remember']");

        var submitBtn = signinGroup.find(".submit-btn");
        submitBtn.click(function () {
            var telephone = telephoneInput.val();
            var password = passwordInput.val();
            var remember = rememberInput.prop("checked");//勾选框不能用val获取，要通过prop，已勾选，prop方法会返回true，否则会返回false
            xfzajax.post({
                'url':'/account/login/',
                'data':{
                    'telephone':telephone,
                    'password':password,
                    'remember':remember?1:0,
                },
                'success':function (result) {
                    if(result['code'] === 200){
                        self.hideEvent();
                        window.location.reload();//重新加载页面
                    }
                    else{
                        var messageObject = result['message'];
                        console.log(messageObject)
                        if(typeof messageObject=="string" ||messageObject.constructor==String){
                            window.messageBox.show(messageObject);
                        }
                        else {
                            for(var key in messageObject){
                                var messages = messageObject[key];
                                var message = messages['message'];
                                window.messageBox.show(message);


                            }
                        }

                    }
                },
                'fail':function (error) {
                    console.log(error)
                }

            })


        })

    };


//整个网页全都加载出来后才会调用该函数
$(function () {
    var auth = new Auth();
    auth.run();
})