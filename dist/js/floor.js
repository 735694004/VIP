$(function () {
    //第二遍
    var flag = true;
    $(window).scroll(function () {
        if (flag) {
            var st = $(this).scrollTop();
            if(st>500){
                $(".main-nav").css({
                    position:"fixed",
                    top:0
                })
            }
            if(st<500){
                $(".main-nav").css({
                    position:"static"
                   
                })
            }
            if (st > 1229) {
                $("#floorNav").fadeIn();
            } else {
                $("#floorNav").fadeOut();
            }

            $("#content li").each(function () {
                if (st >= $(this).offset().top - $(this).outerHeight() / 2) {
                    var index = $(this).index();
                    $("#floorNav li").eq(index).addClass("hover").siblings().removeClass("hover");
                }
            })

        }
    })

    $("#floorNav li:not(:last)").click(function () {
        flag = false;
        var index = $(this).index();
        $(this).addClass("hover").siblings().removeClass("hover");
        $("body,html").animate({ "scrollTop": $("#content li").eq(index).offset().top }, 200, function () {
            flag = true;
        });
    });
    $("#floorNav li:last").click(function () {
        $("body,html").animate({ "scrollTop": 0 }, 200);

    })
})