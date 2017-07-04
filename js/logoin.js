/**
 * Created by 赖孟良 on 2017/7/2.
 */
$(function(){


    var flag3 = false;

    //获取验证码
    $("#proving_code1").click (function(){
        var yzm = parseInt(Math.random()*10000);
        if (yzm > 999){
            $("#proving_code1").val(yzm) ;
        }
        else if (yzm >99){
            $("#proving_code1").val("0" + yzm);
        }
        else if (yzm > 9){
            $("#proving_code1").val("00" + yzm);
        }
        else{
            $("#proving_code1").val("000" + yzm) ;
        }
    })


    //第一次获取验证码
    var yzm = parseInt(Math.random()*10000);
    if (yzm > 999){
        $("#proving_code1").val(yzm) ;
    }
    else if (yzm >99){
        $("#proving_code1").val("0" + yzm);
    }
    else if (yzm > 9){
        $("#proving_code1").val("00" + yzm);
    }
    else{
        $("#proving_code1").val("000" + yzm) ;
    }
    //验证码验证
    $("#proving_code").keyup (function() {
        var val = $("#proving_code1").val();
        for (var i = 0; i < val.length; i++) {
            if (val[i] == $("#proving_code").val()[i]) {
                $("#toast").html("验证码输入合法但未输完");
                if (i == 3) {
                    $("#toast").html("验证码输入合法");
                    flag3 = true;
                }
            }
            else {
                $("#toast").html("验证码输入不合法");
                flag3 = false;
            }
        }
    })



//点击登录
    $("#logoin").on("click",function(){
        if (flag3){
            $.post("../php/logoin.php",{phoneNumber:$("#username").val(),pwd:$("#userpsd").val()},
                function (data) {
                    var obj = JSON.parse(data);
                    $("#toast").html(obj.msg);
                    console.log(obj.msg);
                    if(obj.status == 2){
                        var name = $.cookie("useName");
                        name = $("#login_name").html($("#username").val());
                        $.cookie("useName", name, {expires:30, path:"/"});
                        console.log( $.cookie("useName") );
                    }
                })
        }
        else{
                $("#toast").html("输入不合法");
            }


    })



    //关闭广告
    $(".ads_btn").on("click",function(){
        $("#ads").css("display","none");
    })
})