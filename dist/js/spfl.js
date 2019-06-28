$(function () {
   

    $.get("http://47.104.244.134:8080/goodstypelist.do", { l: 1 }).done(function (data) {
        var str = ""
    
        for (var id in data) {
            str += `<li class='tseq'  data-id="${data[id].id}"><a href="#">${data[id].name}</a></li>`
        }
        $(".spflbefore").html(str)
    })
    $.get("http://47.104.244.134:8080/goodstypelist.do", { l: 2 }).done(function (data) {
        var p5str = "<ul class='right-nav' data-id='5'>"
        var p6str = "<ul class='right-nav' data-id='6'>"
        var p7str = "<ul class='right-nav' data-id='7'>"
        var p12str = "<ul class='right-nav' data-id='12'>"
 
        for (var id in data) {
            switch (data[id].parentid) {
                case 5: p5str += `<li class='tse' data-id="${data[id].id}"><a href="#">${data[id].name}<span class='iconfont'>&#xe6c7;</span></a><ul class='right-nav-2'></ul></li>`; break;
                case 6: p6str += `<li class='tse' data-id="${data[id].id}"><a href="#">${data[id].name}<span class='iconfont'>&#xe6c7;</span></a><ul class='right-nav-2'></ul></li>`; break;
                case 7: p7str += `<li  class='tse'data-id="${data[id].id}"><a href="#">${data[id].name}<span class='iconfont'>&#xe6c7;</span></a><ul class='right-nav-2'></ul></li>`; break;
                case 12: p12str += `<li class='tse' data-id="${data[id].id}"><a href="#">${data[id].name}<span class='iconfont'>&#xe6c7;</span></a><ul class='right-nav-2'></ul></li>`; break;
            }
        }
        $(".spflbefore li[data-id='5']").eq(0).append(p5str + "</ul>")
        $(".spflbefore li[data-id='6']").eq(0).append(p6str + "</ul>")
        $(".spflbefore li[data-id='7']").eq(0).append(p7str + "</ul>")
        $(".spflbefore li[data-id='12']").eq(0).append(p12str + "</ul>")
        $("ul.right-nav-2").append("<li>假装</li><li>还有</li><li>分类</li>")       
    })  
   //.spfl 商品分类  框架里已经有点击事件  只需要加移入移出事件
   //商品分类下边的ul  --#spflb 
   //#spflb>li --tseq li 
   //.tesq>a和ul  a:家用电器  ul .right-nav>li .tse
   //.tse>a和ul    a:洗衣机>  ul  ..right-nav-2>li假装还有
    $(".spfl").hover(function(){//移入
        $("#spflb").show().children("li")
        .hover(function(){            
            $(this).children("a").css({"color":"#f10983","background":"#fff"}).end().children("ul").show()
        },function(){
            $(this).children("a").css({"color":"#fff","background":"#f10983"}).end().children("ul").hide().end().show()
        }).end().show();
     },
     function(){//移出
        $("#spflb").hover(function(){
             $("#spflb").show().children("li").show().end().parent().show()           
        },function(){
           $("#spflb").hide().parent().show()
        }).show()
    })
    $(".spfl").click(function(){
        $("#spflb").slideToggle();
    })

  $(".h-area").click(function(){
    $('.c-h-area-body').slideToggle()
  })
 
})