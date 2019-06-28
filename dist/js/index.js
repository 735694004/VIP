$(function () {
    var Token = location.search.split("=")[1];   
    console.log(Token===undefined) 
    if (Token !==undefined&&Token!=="undefined") {        
        var user = JSON.parse(localStorage.getItem(Token))//user是token值 对应的值是用户名
        $("#mydd").attr("href", "cart.html?token=" + Token)
        $(".r-log").text("欢迎" + user);
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
                $("#rCount").text(gCounts);
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
    $(".c-search-input").on("focus", function () {

        $(".c-search-helper").show()
    })
    $(".c-search-input").on("blur", function () {

        $(".c-search-helper").hide()
    })
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
    //导航栏的更多事件
    $(".dropdown-menu>li").click(function (e) {
        e.stopPropagation();
        window.location.href = 'plist.html?token=' + Token, "_blank";
    })
     //搜索框的点击事件
     $("#search-fdj").click(function () {
        window.location.href = 'plist.html?token=' + Token, "_blank";
    })

    $(".c-search-helper").find("a").click(function () {
        $(this).attr("href", 'plist.html?token=' + Token);
    })
    // //商品分类二级菜单点击事件
    // $("#spflb").children("li").click(function(e){
    //     e.stopPropagation();
    //     window.location.href = 'plist.html?token=' + Token, "_blank";
    // })


    $.get("http://47.104.244.134:8080/goodsbytid.do", { tid: 13, page: 2, limit: 6 }).done(function (data) {
        var str = "";
        for (var id in data.data) {
            var url = data.data[id].picurl;
            if (url == "") {
                url = "../imgs/16.jpg";
            }
            str += `<li>
                    <a href="detial.html?id=${data.data[id].id}&token=${Token}" target="_blank">
                     <img src="${url}">
                    <p class="gooinf">
                    <span class="title">${data.data[id].name}</span>
                    <span class="price"><em >快疯抢</em>￥${data.data[id].price} <i>￥69</i></span>
                                    </p>
                                </a>
                            </li>`;
        }

        $(".bl-pink-ul").html(str)

    })
    $.get("http://47.104.244.134:8080/goodsbytid.do", { tid: 13, page: 1, limit: 6 }).done(function (data) {
        var str = ""

        for (var id in data.data) {
            var url = data.data[id].picurl;
            if (url == "") {
                url = "../imgs/16.jpg";
            }
            str += `<li>
                    <a href="detial.html?id=${data.data[id].id}&token=${Token}" target="_blank">
                     <img src="${url}">
                    <p class="gooinf">
                    <span class="title">${data.data[id].name}</span>
                    <span class="price"><em >快疯抢</em>￥${data.data[id].price} <i>￥69</i></span>
                                    </p>
                                </a>
                            </li>`;
        }

        $(".bl-blue-ul").html(str)
    })
    //秒杀
    function ms() {
        var jzd = new Date("2019-7-2 18:00:00");

        var res = getdiffdate(jzd)

        $(".J-sp-time-H").html(res[0] < 10 ? "0" + res[0] : res[0])
        $(".J-sp-time-M").html(res[1] < 10 ? "0" + res[1] : res[1])
        $(".J-sp-time-S").html(res[2] < 10 ? "0" + res[2] : res[2])
        var timer = setInterval(function () {
            var res = getdiffdate(jzd)
            $(".J-sp-time-H").html(res[0] < 10 ? "0" + res[0] : res[0])
            $(".J-sp-time-M").html(res[1] < 10 ? "0" + res[1] : res[1])
            $(".J-sp-time-S").html(res[2] < 10 ? "0" + res[2] : res[2])
            if (res[0] == 0 && res[1] == 0 && res[2] == 0) {
                clearInterval(timer);
            }
        }, 1000);

        function getdiffdate(date) { //参数为截止时间
            var date1 = new Date(); //获取当前时间
            var ms = Math.abs(date - date1); //得到相差的毫秒数
            var ss = ms / 1000;

            var second = Math.floor(ss % 60)

            var min = Math.floor(ss / 60 % 60)

            var hour = Math.floor(ss / 60 / 60)

            return [hour, min, second];
        }
    }
    ms();
    //女装鼠标移入事件
    $(".nz-pic").hover(function () {
        $(this).fadeOut().fadeIn().find(".iconfont").fadeIn()
            .hover(function () {
                $(this).css({ color: "#fff", background: "#f10983" })
            }, function () {
                $(this).css({ color: "#f10983", background: "#fff" })
            })
    }, function () {
        $(this).find(".iconfont").fadeOut()
    });
    $(".nz-pic").click(function () {
        window.location.href = 'plist.html?token=' + Token, "self";
    });

    $(".r-nav-cart").click(function () {
        gocart(Token);
    })
    $(".r-nav-user").hover(function () {
        $(this).find(".r-nav-login").animate({ "left": "-275" }, 500)
    },
        function () {
            $(this).find(".r-nav-login").animate({ "left": "36" }, 500)
        });
   
    //轮播图片点击事件
    $("#index-lb").find("img").click(function () {
        window.location.href = 'plist.html?token=' + Token, "_blank";
    })
   
    //女装的更多
    $("#nz-more").click(function () {
        window.location.href = 'plist.html?token=' + Token, "_blank";
    })
   
});