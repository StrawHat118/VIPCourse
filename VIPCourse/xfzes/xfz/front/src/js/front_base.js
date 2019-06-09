//用来处理导航条
function FrontBase() {
    
}

FrontBase.prototype.run = function(){
    var self = this;
    self.listenAuthBoxHover();
}


FrontBase.prototype.listenAuthBoxHover = function () {
    var authBox = $(".auth-box");
    var userMoreBox = $(".user-more-box");
    authBox.hover(function () {
        userMoreBox.show();
    },function () {
        userMoreBox.hide();
    })

};

//整个网页都加载出来才执行该函数
$(function () {
    var frontBase = new FrontBase();
    frontBase.run();
});


//用来处理登录和注册




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
    self.smsCaptcha = $('.sms-captcha-btn');



}
//构造函数绑定方法
//run方法是类或对象的入口，包括监听事件ajax事件
Auth.prototype.run = function () {
    var self = this;
    self.listenShowHideEvent();//在run方法中才会执行
    self.listenSwitchEvent();
    self.listenSigninEvent();
    self.listenImgCaptchaEvent();
    self.listenSmsCaptchaEvent();
    self.listenSignupEvent();
}
//展示事件
Auth.prototype.showEvent = function(){
    var self = this;
    self.maskWrapper.show();

};
//隐藏事件
Auth.prototype.hideEvent = function(){
    var self = this;
    self.maskWrapper.hide();
};
//监听展示隐藏事件
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

Auth.prototype.listenSignupEvent =
        function(){
        var self = this;
        var signupGroup = $('.signup-group');
        var submitBtn = signupGroup.find(".submit-btn");



        var telephoneInput = signupGroup.find("input[name='telephone']");
        var usernameInput = signupGroup.find("input[name='username']");
        var imgCaptchaInput = signupGroup.find("input[name='img_captcha']");
        var password1Input = signupGroup.find("input[name='password1']");
        var password2Input = signupGroup.find("input[name='password2']");
        var smsCaptchaInput = signupGroup.find("input[name='sms_captcha']");
        submitBtn.click(function () {

            var telephone = telephoneInput.val();
            var username = usernameInput.val();
            var img_captcha = imgCaptchaInput.val();
            var password1 = password1Input.val();
            var password2 = password2Input.val();
            var sms_captcha = smsCaptchaInput.val();
            xfzajax.post({
                'url':'/account/register/',
                'data':{
                    'telephone':telephone,
                    'username':username,
                    'img_captcha':img_captcha,
                    'password1':password1,
                    'password2':password2,
                    'sms_captcha':sms_captcha
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


//监听
Auth.prototype.listenImgCaptchaEvent = function(){
    //获取这个元素
    var imgCaptcha = $('.img-captcha');
    imgCaptcha.click(function () {
        imgCaptcha.attr("src","/account/img_captcha"+"?random="+Math.random())
    })
}

Auth.prototype.smsSuccessEvent = function () {
    var self = this;
    messageBox.showSuccess('短信验证码发送成功！');
    self.smsCaptcha.addClass('disabled');
    var count = 10;
    self.smsCaptcha.unbind('click');
    var timer = setInterval(function () {
        self.smsCaptcha.text(count+'s');
        count -= 1;
        if(count <= 0){
            clearInterval(timer);
            self.smsCaptcha.removeClass('disabled');
            self.smsCaptcha.text('发送验证码');
            self.listenSmsCaptchaEvent();
        }
    },1000);
};

Auth.prototype.listenSmsCaptchaEvent = function(){
    var self = this;
    var smsCaptcha = $('.sms-captcha-btn');
    var telephoneInput = $(".signup-group input[name='telephone']");
    smsCaptcha.click(function () {
        var telephone = telephoneInput.val();
        if(!telephone){
            messageBox.showInfo('请输入手机号码！');
        }
        else {
            xfzajax.get({
            'url':'/account/sms_captcha/',
            'data':{
                'telephone':telephone,
            },
            'success':function (result) {
                if(result['code']==200){
                    console.log(result);
                    self.smsSuccessEvent();
                }
            },
            'fail':function () {
                console.log(error);
            }
        })

        }
    })
}



//整个网页全都加载出来后才会调用该函数
$(function () {
    var auth = new Auth();
    auth.run();
})