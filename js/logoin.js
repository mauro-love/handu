/**
 * Created by 赖孟良 on 2017/7/2.
 */
$(function(){



//点击登录
    $("#logoin").on("click",function(){
        $.post("../php/logoin.php",{phoneNumber:$("#username").val(),pwd:$("#userpsd").val()},
            function (data) {

                console.log(data.msg);
            },"JSON")
    })



    //关闭广告
    $(".ads_btn").on("click",function(){
        $("#ads").css("display","none");
    })
})