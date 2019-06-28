$(function () {
   
   
    if (location.search.length > 0) {//从登陆页面进来的用登陆页面传来的用户名密码

        var uname=location.search.split("&")[0].split("=")[1];
        var upw=location.search.split("&")[1].split("=")[1];
        $("#J_login_name").val(uname);//location.search.substring(7, 16))
        $('#J_login_pwd').val(upw);//location.search.substring(19))
    }else{//直接从登陆页面进来的时候用记住的用户名
        if(localStorage.getItem("username")){
            $("#J_login_name").val(localStorage.getItem("username"))
        }
    }
    $(".c-tab-nav-item-qr").click(function () {
        $(".c-tab-code").show()
        $(".c-tab-nav-item-qr").addClass("is-tab-nav-item-active");
        $(".c-tab-np").hide()
        $(".c-tab-nav-item-cc").removeClass("is-tab-nav-item-active");
    })
    $(".c-tab-nav-item-cc").click(function () {
        $(".c-tab-np").show()
        $(".c-tab-nav-item-cc").addClass("is-tab-nav-item-active");
        $(".c-tab-code").hide()
        $(".c-tab-nav-item-qr").removeClass("is-tab-nav-item-active");
    })
  
    $("#J_login_submit").click(function () {       
        if ($("#J_remember_username").prop("checked")) {        
            localStorage.setItem("username", $("#J_login_name").val())
        }
        else{
            localStorage.removeItem("username") 
        }
        $.post("http://47.104.244.134:8080/userlogin.do", {
            name: $("#J_login_name").val(), password: $('#J_login_pwd').val()
        }).done(function (data) {
            if (data.code == 0) {               
                var user=  $("#J_login_name").val();
                localStorage.setItem(data.data.token, JSON.stringify(user))                
                window.open('index.html?token=' + data.data.token, 'self');
            } else {
                $('#J_login_pwd').val("")
                $("#J_login_name").val("")
                alert("用户名或密码错误")
            }
        })

    })
})