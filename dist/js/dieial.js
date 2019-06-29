$(function () {
    //处理商品id和token
    if (location.search.indexOf("token") > 0) {
        var Gid = location.search.split("&")[0].split("=")[1];
        var Token = location.search.split("&")[1].split("=")[1];
        if (Token !== undefined && Token !== "undefined") {
            var user = JSON.parse(localStorage.getItem(Token))//user是token值 对应的值是用户名
            $("#mydd").attr("href", "cart.html?token=" + Token)
            $("#ydl").text("欢迎" + user).click(function () {
                alert("您已登录")
                $(this).attr("href", "#")
            });
            $(".login-before").hide();
            $.get("http://47.104.244.134:8080/cartlist.do", {
                token: Token
            })
                .done((data) => {
                    console.log(data)
                    var gCounts = 0;
                    for (var i = 0; i < data.length; i++) {
                        gCounts += data[i].count;
                    }
                    $("#Count").text(gCounts);                   
                })
        } else {
            $("#mydd").click(function () {
                var msg = confirm("您还没登录，是否跳转至登录页面")
                if (msg) {
                    window.open('logn.html')//+data.token,'_blank'); 
                } else {
                    $("#mydd").attr("href", "#")
                }
            })
        }       
    } 
    $(".head-cart").click(function () {
        gocart(Token);
    });
    $(".nav-tabs>li").not("li:first").not("li:first").not("li:last").hover(function () {
        $(this).children("a").css("color", "#f10983")
    }, function () {
        $(this).children("a").css("color", "#337ab7")
    }).click(function () {
        window.location.href = 'plist.html?token=' + Token, "self";
    });
    //导航颜色
    $(".nav-tabs>li").not("li:first").not("li:first").hover(function () {
        $(this).children("a").css("color", "#f10983")
    }, function () {
        $(this).children("a").css("color", "#333")
    })
   
    //导航栏的更多事件
    $(".dropdown-menu>li").click(function (e) {
        e.stopPropagation();
        window.location.href = 'plist.html?token=' + Token, "_blank";
    })
    //跳转到购物车的函数
    function gocart(token) {
        if (token !== undefined && token !== "undefined") {
            window.location.href = 'cart.html?token=' + token, "self";
        } else {
            var msg = confirm("您还没登录，是否跳转至登录页面？");
            if (msg) {
                window.location.href = 'logn.html';
            }

        }
    }
    $.get("http://47.104.244.134:8080/goodsbyid.do", { id: Gid }).done(function (data) {
        console.log(data)
        var url = data.picurl;
        if (url == "") {
            url = "../imgs/16.jpg";
        }
        $(".good-type").text(data.info);
        $(".title").text(data.name);
        $(".zhen-price").html("<i>￥</i>" + data.price);
        $(".pic>img").attr("src", url)
    })
    //加入购物车
    $(".btn").click(function () {
        if (Token==="undefined") {
            var msg = confirm("您还没登录，是否跳转至登录页面")
            if (msg) {
                window.open('logn.html')
            } else {
                $(".btn").attr("href", "#")
            }           
        } else {
            //这个地方有问题  竟然调用一次数量加一
            for (var i = 0; i < $("#input-count").val(); i++) {
                $.get("http://47.104.244.134:8080/cartsave.do", 
                 { gid: Gid, token: Token }).done(function (data) {
                    console.log(data)
                })
            }
            if (i == $("#input-count").val()) {
                var msg = confirm("是否跳转至购物车页面")
                if (msg) {
                    window.open('cart.html?token=' + Token)
                }

            } else {
                alert("添加失败")
            }
        }
    })
    //-+
    $("#plus").click(function () {
        var count = Number($("#input-count").val())
        count++;
        if (count >= 10) {
            $("#input-count").val(10)
            $(".tishi").text("此商品一次限购10件，bugbug要判断购物车里有几件").show()
        } else {
            $("#input-count").val(count)
            $(".tishi").hide()
        }
    })
    $("#sub").click(function () {
        var count = Number($("#input-count").val())
        count--;
        if (count < 1) {
            $("#input-count").val(1)
            $(".tishi").text("再减就没了").show()
        } else {
            $("#input-count").val(count)
            $(".tishi").hide()
        }
    })
    $("#input-count").blur(function () {
        if ($(this).val() <= 10) {
            $(".tishi").hide()
        } else {
            $("#input-count").val(10)
            $(".tishi").show()
        }
    })

    //放大镜
    var Index = 1;//图片索引
    $(".pic-box").hover(function () {//移入
        $(this).find("img").attr("src", "../imgs/xqpic" + Index + "-big.jpg").css("position", "absolute")
            .end().find("span").hover(
                function () {//右下角放大镜移入
                    $(".pic-box").find("img").attr("src", "../imgs/xqpic" + Index + "-mid.jpg")
                },
                function () {//右下角放大镜移出
                    $(".pic-box").find("img").attr("src", "../imgs/xqpic" + Index + "-big.jpg")
                }
            )
        $("#move").css("display", "block");
    }, function () {//移出
        $(this).find("img").attr("src", "../imgs/xqpic" + Index + "-mid.jpg").css("position", "static")
        $("#move").css("display", "none");
    })
    $(".pic-box").mousemove(function (event) {
        var x = event.pageX;
        var y = event.pageY;
        var nx = x - $(".pic-box").offset().left - $("#move").width() / 2;
        var ny = y - $(".pic-box").offset().top - $("#move").height() / 2;
        //判断移动后是否已经超出的范围
        if (nx < 0) { //左边超出
            nx = 0;
        }
        if (nx > $(".pic-box").width() - $("#move").width()) {//右边超出
            nx = $(".pic-box").width() - $("#move").width();
        }
        if (ny < 0) { //顶端超出
            ny = 0;
        }
        if (ny > $(".pic-box").height() - $("#move").height()) {//底部超出
            ny = $(".pic-box").height() - $("#move").height();
        }
        //设置放大区域的移动
        $("#move").css({
            left: nx + "px",
            top: ny + "px"
        });
        //设置大图片的移动 反方向  
        $(".pic-box").find("img").css({
            left: -nx * $("#move").width() / 41 + "px",
            top: -ny * $("#move").height() / 41 + "px"
        })
    })
    //tab切换
    $(".tab-box").find("img").click(function () {
        $(".tab-box").find("img").removeClass("active");
        $(this).addClass("active");
        Index = $(this).attr("index");
        $(".pic-box").find("img").attr("src", "../imgs/xqpic" + Index + "-mid.jpg")
    })
})