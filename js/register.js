/**
 * Created by 赖孟良 on 2017/7/1.
 */
$(function(){
//	tab效果
    $(".type").find("li").eq(0).addClass("type_on");
    $(".register_right_box").find("div").eq(0).show()
    $(`.type`).on("click","li",function(){
        $(this).addClass("type_on").siblings().removeClass("type_on");
        var index = $(this).index();
        $(`.register_right_box>div`).eq( index ).show().siblings().hide();
    })
    var flag0 = false;
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    var flag4 = false;


//用户名验证
$("#phoneNumber").keyup( function(){
    var val = $(this).val();
    var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))\d{8}$/;
    if (reg.test(val)){
        $("#toast").html("手机号输入合法") ;
        flag0 = true;
    }
    else{
        $("#toast").html("手机号输入不合法") ;
        flag0 = false;
    }
})
////密码验证
$("#userPsd").keyup( function(){
    var val = $(this).val();
    var reg = /^.{8,20}$/
    if (reg.test(val)){
        $("#toast").html("密码输入合法");
        flag1 = true;
    }
    else{
        $("#toast").html("密码输入不合法");
        flag1 = false;
    }
})
//重复输入密码
$("#userPsda").keyup(function (){
    var val = $("#userPsd").val();
    for (var i = 0 ; i < $(this).val().length ; i++){
        if (val[i] == $(this).val()[i]){
            $("#toast").html("重复密码输入合法但未输完");
            if (i== ($(this).val().length)-1){
                $("#toast").html("重复密码输入合法");
                flag2 = true;
            }
        }
        else {
            $("#toast").html("重复密码输入不合法") ;
            flag2 = false;
        }
    }
})
    //获取验证码
    $("#codesa").click (function(){
        var yzm = parseInt(Math.random()*10000);
        if (yzm > 999){
            $("#codesa").val(yzm) ;
        }
        else if (yzm >99){
            $("#codesa").val("0" + yzm);
        }
        else if (yzm > 9){
            $("#codesa").val("00" + yzm);
        }
        else{
            $("#codesa").val("000" + yzm) ;
        }
    })


    //第一次获取验证码
    var yzm = parseInt(Math.random()*10000);
    if (yzm > 999){
        $("#codesa").val(yzm) ;
    }
    else if (yzm >99){
        $("#codesa").val("0" + yzm);
    }
    else if (yzm > 9){
        $("#codesa").val("00" + yzm);
    }
    else{
        $("#codesa").val("000" + yzm) ;
    }
    //验证码验证
    $("#codes").keyup (function(){
        var val = $(this).val();
        for (var i = 0 ; i < val.length ; i++){
            if (val[i] == $("#codes").val()[i]){
                $("#toast").html("验证码输入合法但未输完");
                if (i == 3){
                    $("#toast").html("验证码输入合法");
                    flag3 = true;
                }
            }
            else {
                $("#toast").html("验证码输入不合法") ;
                flag3 = false;
            }
        }
    })


    $("#register").click(function(e){
        e.stopPropagation();
        if (flag0 && flag1 && flag2 && flag3 ){


            $.post("../php/register.php",{phoneNumber:$(".register_right_phone").find("input").eq(0).val(),pwd:$(".register_right_phone").find("input").eq(3).val()},
                function (data) {
                    $("#toast").html( "恭喜您，注册成功了！");
                    console.log(data);
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
