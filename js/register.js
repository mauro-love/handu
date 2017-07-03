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

console.log(1);
//用户名验证
$("#phoneNumber").keyup( function(){
    var val = $(this).val();
    var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))\d{8}$/;
    if (reg.test(val)){
        $("#toast").html("手机号输入合法") ;
    }
    else{
        $("#toast").html("手机号输入不合法") ;
    }
})
////密码验证
$("#userPsd").keyup( function(){
    var val = $(this).val();
    var reg = /^.{8,20}$/
    if (reg.test(val)){
        $("#toast").html("密码输入合法");
    }
    else{
        $("#toast").html("密码输入不合法");
    }
})
//重复输入密码
//$("#userPsda").keyup(  function (){
//    var val = $("#userPsd").val();
//    for (var i = 0 ; i < this.value.length ; i++){
//        if (val[i] == $(this).value[i]){
//            $("#toast").html("重复密码输入合法但未输完");
//            if (i== $("userPsd").val().length-1){
//                $("#toast").html("重复密码输入合法");
//                //flag2 = true;
//            }
//        }
//        else {
//            $("#toast").html("重复密码输入不合法") ;
//            //flag2 = false;
//        }
//    }
//})
//
////获取验证码
//$("#codesa").click ( function (){
//    var yzm = parseInt(Math.random()*10000);
//    if (yzm > 999){
//        $("#codesa").val（yzm）;
//    }
//    else if (yzm >99){
//        $("#codesa").val（"0" + yzm） ;
//    }
//    else if (yzm > 9){
//        $("#codesa").val（"00" + yzm） ;
//    }
//    else{
//        $("#codesa").val（"000" + yzm） ;
//    }
//})
//点击注册
$("#register").on("click",function(){
    $.post("../php/register.php",{phoneNumber:$(".register_right_phone").find("input").eq(0).val(),pwd:$(".register_right_phone").find("input").eq(3).val()},
        function (data) {
            console.log(data);
        })
})



//关闭广告
    $(".ads_btn").on("click",function(){
        $("#ads").css("display","none");
    })


})
