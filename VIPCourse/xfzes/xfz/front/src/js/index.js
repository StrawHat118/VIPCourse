//面向对象
//1.通过this关键字绑定属性,并且指定它的值
//原型链
//添加方法
//在Banner.prototype上绑定方法即可
// function Banner() {
//     //这里的代码相当于python中的__inin__方法的代码
//     console.log('构造函数');
//     this.person = 'zhiliao'//this代表当前的Banner对象
//
// }
// //原型链
// Banner.prototype.greet = function (word) {
//     console.log('hello',word);
//
// }
//
// var banner = new Banner();
// console.log(banner.person);
// banner.greet('zhiliao');

function Banner() {
    //构造函数
    //提取banner-group
    this.bannerWidth = 798;
    this.bannerGroup = $("#banner-group");
    this.index = 0;
    //提高性能，通过属性来调用，因为已经定义在构造函数中
    this.leftArrow = $('.left-arrow')
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $("#banner-ul");//获取ul标签
    this.liList  = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.pageControl = $('.page-control');

}
//定义bannerUl的长度
Banner.prototype.initBanner = function(){
    var self = this
    this.bannerUl.css({width:self.bannerWidth*(self.bannerCount+2),'left':-self.bannerWidth})//设置宽度,通过css来设置样式

    //第一张轮播图,获取第0个li标签,对第一个li标签进行复制
    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.bannerCount-1).clone();
    //将第一张轮播图添加到最后面
    self.bannerUl.append(firstBanner);
    //prepend 将元素添加到第一个
    self.bannerUl.prepend(lastBanner);




}





//处理小点点
Banner.prototype.initPageControl = function(){
    var self = this;
    for(var i=0; i <self.bannerCount; i++){
        var circle = $("<li></li>");
        self.pageControl.append(circle)
        if(i === 0){
            circle.addClass("active");
        }
    }

    self.pageControl.css({"width":8*2+12*self.bannerCount+16*(self.bannerCount-1)})
}




//显示和隐藏arrow
Banner.prototype.toggleArrow = function(isShow){
    //通过参数来控制
    var self = this;
    if(isShow){
        this.leftArrow.show();
        this.rightArrow.show();
    }
    else {
        this.leftArrow.hide();
        this.rightArrow.hide();
    }


}


//监听banner是否被覆盖
Banner.prototype.listenBannerHover  = function(){
    //通过this对象获取Banner对象的属性
    var self = this;//将this通过另外一个对象引用
    this.bannerGroup.hover(function () {
        //第一个函数是把鼠标移动到banner上会执行的函数
            //this在每个函数中代表当前的对象
            clearInterval(self.timer);//清除定时器
            self.toggleArrow(true);//调用隐藏的方法toggle
    },function () {
        //第二个函数是把鼠标从banner上移走会执行的函数
        self.loop();
        self.toggleArrow(false);
    }
        )
}
//将run方法当做Banner的主入口 ，不把所有的逻辑放到run里面
//把相应的逻辑放在单独的函数中处理，run函数中只进行步骤的拼接
//banner循环
Banner.prototype.loop = function(){
    var self = this;
    var bannerUl = $("#banner-ul");
     // bannerUl.css({"left":-798});
    //this代表banner对象上的一个属性，其他地方就可以通过对象来使用
    this.timer =  setInterval(function () {
        if(self.index>=self.bannerCount+1){
            self.bannerUl.css({"left":-self.bannerWidth})
            self.index=2;
        }
        else {
            self.index++;
        }
        self.animate();
    },2000);//定时器，两秒钟执行一次这个代码

}

//定义监听箭头
Banner.prototype.listenArrowClick = function(){
    var self = this;

    self.leftArrow.click(function () {
        if(self.index === 0){
            //无限循环
            self.bannerUl.css({"left":-self.bannerWidth*self.bannerCount})
            self.index = self.bannerCount -1;
        }
        else {
            self.index--;
        }
        self.animate();
    });
    self.rightArrow.click(function () {
        if(self.index === self.bannerCount +1){
            //无限循环
            self.bannerUl.css({"left":-self.bannerWidth});
            self.index = 2;
        }
        else {
            self.index++;
        }
        self.animate();

    })
}

//
Banner.prototype.animate = function(){
    var self = this;
    self.bannerUl.animate({"left":-798*self.index},500);
    //处理无限循环轮播图的小点点
    var index = self.index;
    if(index===0){
        index =self.bannerCount-1;
    }else if(index === self.bannerCount+1){
        index = 0  ;
    }else {
        index = self.index -1 ;
    }
    ;

    //eq代表获取li标签中的第几个
    self.pageControl.children("li").eq(index).addClass('active');
    self.pageControl.children("li").eq(index).siblings().removeClass('active');
};




//监听小点点
Banner.prototype.listenPageControl = function(){
    var self =this;
    self.pageControl.children("li").each(function (index,obj) {
        $(obj).click(function () {
           self.index = index + 1;
           self.animate()

        });
    });

};





Banner.prototype.run = function () {
    console.log('running...');
    this.initBanner();
    this.initPageControl();
    this.loop();
    this.listenArrowClick();
    this.listenPageControl();
    this.listenBannerHover();


};
//$函数非常强大，如果在这个函数中定义了另外一个函数，一定会在整个文档元素全部加载后才会执行这里面的代码
$(function () {
    var banner = new Banner();
    banner.run();
    
})