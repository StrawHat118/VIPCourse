//点击登录按钮，弹出模块对话框
$(function () {
    $("#btn").click(function () {
        $(".mask-wrapper").show();
    })
    $(".close-btn").click(function () {
        $(".mask-wrapper").hide();
    })
})

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