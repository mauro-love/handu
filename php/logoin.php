<?php
/**
 * Created by PhpStorm.
 * User: 赖孟良
 * Date: 2017/7/2
 * Time: 13:34
 */



//phoneNumber : 用户手机号
//pwd : 密码


//允许跨域
header("Access-Control-Allow-Origin: *");
//获取前端提交过来的参数
$phoneNumber = $_POST["phoneNumber"];
$pwd = $_POST["pwd"];


class Res {
    public  $status;
    public  $msg;
}


//登录
$conn = new mysqli("127.0.0.1", "root", "", "handu") or die("连接失败");
$sql = "select * from usertable where phoneNumber='$phoneNumber'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
if($phoneNumber == "")
{

    $res = new Res();
    $res->status = 0;
    $res->msg = "请填写手机号";
    echo  json_encode($res);
}
elseif($pwd == "")
{

    //echo "请填写密码<br><a href='login.php'>返回</a>";
    $res = new Res();
    $res->status = 1;
    $res->msg = "请填写密码";
    echo  json_encode($res);

}
else
{
    if($result && ($row["phonenumber"] == $phoneNumber) && ($row["upsd"] == $pwd))

    {
        //echo "验证成功！<br>";
        $res = new Res();
        $res->status = 2;
        $res->msg = "登录成功";
        echo  json_encode($res);
    }

    else
    {

        //echo "密码错误<br>";
        $res = new Res();
        $res->status = 3;
        $res->msg = "用户名或密码错误";
        echo  json_encode($res);


    }


}
?>





