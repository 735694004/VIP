$(function () {

    //手机号验证
    $("#J_mobile_name").blur(function () {
        var reg = /^1(3|4|5|7|8|9)\d{9}$/;
        var tt = reg.test($("#J_mobile_name").val());
        if ($("#J_mobile_name").val().length == 0) {
            $(".u-input-warning:first").show().css({ "color": "red" })
            $(".text-phone").text("手机号不能为空！").css({ "color": "red" })
        } else {
            if (tt) {
                $(".u-input-warning:first").hide()
                $(".u-input-success:first").show().css({ "color": "green" })
                $(".text-phone").hide();
            } else {
                $("#J_mobile_name").val("");
                $(".u-input-warning:first").show().css({ "color": "red" })
                $(".text-phone").text("请输入正确的手机号！").css({ "color": "red" })
            }
        }

    })
    //生成用户名   
    $("#J_mobile_verifycode_btn").click(function () {
        var verifyCode = parseInt((Math.random() * 9 + 1) * 100000);
        var us="cj_" + verifyCode;
        var em="cj_" + verifyCode+"@qq.com";
        console.log(us,em)
        $.get("http://47.104.244.134:8080/username.do", {
            username: us
        }).done(function (data) {
            if(data.code==1){
                $.get("http://47.104.244.134:8080/useremail.do", {
                    email: em
                }).done(function (dataem) {
                    if(dataem.code==1){
                        alert("请记住你的用户名："+us)
                        $("#J_mobile_code").val(us)
                    }
                })
            }
        })
       


    })
    //密码强度验证
    $("#J_mobile_pwd").blur(function () {
        var txt = $.trim($("#J_mobile_pwd").val());//输入框内容 trim处理两端空格
        var len = txt.length;
        var num = /\d/.test(txt);//匹配数字
        var small = /[a-zA-Z]/.test(txt);//匹配小写字母
        var big = /[A-Z]/.test(txt);//匹配大写字母
        var corps = /\W/.test(txt);//特殊符号
        var val = num + small + big + corps; //四个组合

        if (len < 1) {
            $(".password-tip").text("密码不能为空！").css({ "color": "red" })
            $(".u-input-warning").eq(2).show().css({ "color": "red" })
        } else if (len <= 6) {
            $(".password-tip").hide()
            $(".u-input-warning").eq(2).hide()
            $(".u-input-success").eq(2).show().css({ "color": "green" })
            $(".indicator-text").css({ "color": "#ccc" })
            $(".text-weak").css({ "color": "red" })
        } else if (len > 6 && len <= 8) {
            if (val == 1) {
                $(".password-tip").hide()
                $(".indicator-text").css({ "color": "#ccc" })
                $(".u-input-success").eq(2).show().css({ "color": "green" })
                $(".text-weak").css({ "color": "red" })
            } else if (val == 2) {
                $(".password-tip").hide()
                $(".indicator-text").css({ "color": "#ccc" })
                $(".u-input-success").eq(2).show().css({ "color": "green" })
                $(".text-medium").css({ "color": "yellow" })
            }
        } else if (len > 8) {
            if (val == 1) {
                $(".password-tip").hide()
                $(".indicator-text").css({ "color": "#ccc" })
                $(".text-weak").css({ "color": "red" })
                $(".u-input-success").eq(2).show().css({ "color": "green" })
            } else if (val == 2) {
                $(".password-tip").hide()
                $(".u-input-success").eq(2).show().css({ "color": "green" })
                $(".indicator-text").css({ "color": "#ccc" })
                $(".text-medium").css({ "color": "yellow" })
            } else if (val == 3) {
                $(".password-tip").hide()
                $(".u-input-success").eq(2).show().css({ "color": "green" })
                $(".indicator-text").css({ "color": "#ccc" })
                $(".text-strong").css({ "color": "green" })
            }
            return false;
        }
    })
    //密码确认
    $("#J_mobile_confirm_pwd").on("change", function () {//"input propertychange"

        if ($("#J_mobile_confirm_pwd").val() != $("#J_mobile_pwd").val()) {
            $(".u-input-success").eq(3).hide()
            $(".text-pwqr").show().text("输入错误请重新输入")
            $("#J_mobile_confirm_pwd").val("")
            $(".u-input-warning").eq(3).show().css({ "color": "red" })
        }
        else {
            $(".text-pwqr").hide()
            $(".u-input-warning").eq(3).hide()
            $(".u-input-success").eq(3).show().css({ "color": "green" })
        }
    })
    //确认同意

    $("#J_mobile_reg_button").click(function () {
        if (!$("#J_mobile_agree").prop("checked")) {
            alert("请阅读条款并同意")

        } else {
            $.post("http://47.104.244.134:8080/usersave.do", {
                username: $("#J_mobile_code").val(), password: $("#J_mobile_pwd").val(), email: $("#J_mobile_code").val() + "@qq.com", sex: 1
            }).done(function (data) {
                if (data.code == 0) {
                    alert("页面将跳转到登录页面")
                    window.open('logn.html?usern=' + $("#J_mobile_code").val() + "&pw=" + $("#J_mobile_pwd").val(), 'self');

                } else {
                    alert("用户名已存在")
                }
            })
            // window.open('logn.html?usern='+$("#J_mobile_code").val()+"pw="+$("#J_mobile_pwd").val(), '_blank');                  
        }
    })

})