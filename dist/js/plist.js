$(function () {
    var Token = location.search.split("=")[1]
    if (Token !== undefined && Token !== "undefined") {
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
        console.log("ggg")
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
    $(".nav-tabs>li").not("li:first").not("#acac").hover(function () {
        $(this).children("a").css("color", "#f10983")
        $(".nav-tabs>li").eq(2).children("a").css("color", "#f10983")
    }, function () {
        $(this).children("a").css("color", "#333")
        $(".nav-tabs>li").eq(2).children("a").css("color", "#f10983")
    })

    $(".nav-tabs>li").eq(1).click(function () {
        window.location.href = 'index.html?token=' + Token, "self";
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
    // 右边栏
    $(".r-nav-cart").click(function () {
        gocart(Token);
    })
    $(".r-nav-user").hover(function () {
        $(this).find(".r-nav-login").animate({ "left": "-275" }, 500)
    },
        function () {
            $(this).find(".r-nav-login").animate({ "left": "36" }, 500)
        });

    //表格移入移出
    $("td").hover(
        function () {
            $(this).find("p").show().end().css("borderColor", "#f10983")
        },
        function () {
            $(this).find("p").hide().end().css("borderColor", "#ccc")
        }
    )
    $("table").find("img").attr("src", "../imgs/12.jpg")

    var flag = true;
    $(window).scroll(function () {
        if (flag) {
            var st = $(this).scrollTop();
            if (st > 500) {
                $(".main-nav").css({
                    position: "fixed",
                    top: 0
                })
            }
            if (st < 500) {
                $(".main-nav").css({
                    position: "static"

                })
            }
        }
    })
    var numsPerPage = 12;
    var curIndex = 0;
    $.get("http://47.104.244.134:8080/goodsbytid.do", { tid: 13, page: 1, limit: 60 }).done(function (data) {
        console.log(data)
        var totalnums = data.data.length;
        var pages = Math.ceil(totalnums / numsPerPage);
        var str = "";
        for (var i = 0; i < pages; i++) {
            str += "<span>" + (i + 1) + "</span>";
        }
        $(".pageNum").html(str)
        showList(curIndex);
        //首页
        $(".sy").click(function () {
            $(this).parent().children().not(".pageNum").removeClass("active");
            $(this).addClass("active")
            curIndex = 0;
            $(".pageNum").children().removeClass("active").eq(curIndex).addClass("active")
            showList(curIndex);
        })
        //上一页
        $(".syy").click(function () {
            curIndex--;
            if (curIndex <= 0) {
                curIndex = 0;
            }
            $(this).addClass("active").parent().children().not(".pageNum").removeClass("active")
            $(this).addClass("active")
            
            $(".pageNum").children().removeClass("active").eq(curIndex).addClass("active")
            
            showList(curIndex);
        })
        //下一页
        $(".xyy").click(function () {            
            curIndex++;
            if (curIndex >= pages - 1) {
                curIndex = pages - 1;
            }
            $(this).addClass("active").parent().children().not(".pageNum").removeClass("active")
            $(this).addClass("active")
            $(".pageNum").children().removeClass("active").eq(curIndex).addClass("active")           
            showList(curIndex);
        })
        //尾页
        $(".wy").click(function () {
            
            $(this).addClass("active").parent().children().not(".pageNum").removeClass("active")
            $(this).addClass("active")
            curIndex = pages - 1;
            $(".pageNum").children().removeClass("active").eq(curIndex).addClass("active")
            showList(curIndex);
        })

        //具体页码
       
        $(".pageNum").children().click(function () {
            $(".pageNum").children().removeClass("active");
            $(this).addClass("active")
            curIndex =Number($(this).text()) -1;
            showList(curIndex);

        })

        function showList(cur) {
            var str1 = "";

            for (var i = cur * numsPerPage; i < Math.min(totalnums, (cur + 1) * numsPerPage); i++) {
                var url = data.data[i].picurl;
                if (url == "") {
                    url = "../imgs/16.jpg";
                }
                str1 += ` <li>
                <a href="detial.html?id=${data.data[i].id}&token=${Token}" >
                  <img src="${url}">
                </a>
                <p class="price"><span>￥</span>${data.data[i].price}</p> 
                <p class="price-dazhe"><span>￥999</span></p>   
                <p class="title">${data.data[i].name}</p>                         
            </li> `;
            }
    
            $("#gList").html(str1);
        }
    })

})