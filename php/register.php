<?php
/**
 * Created by PhpStorm.
 * User: 赖孟良
 * Date: 2017/7/1
 * Time: 11:11
 */

//phoneNumber : 用户手机号
//pwd : 密码


//允许跨域
header("Access-Control-Allow-Origin: *");
//获取前端提交过来的参数
$phoneNumber = $_POST["phoneNumber"];
$pwd = $_POST["pwd"];

//echo $username.$pwd;
class Res {
    public  $status;
    public  $msg;
}

//注册
$conn = new mysqli("127.0.0.1", "root", "", "handu") or die("连接失败");
$sql = "select * from usertable where phoneNumber='$phoneNumber'";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0){
    //存在相同用户
    $res = new Res();
    $res->status = 0;
    $res->msg = "该用户已存在";
    echo  json_encode($res);
}
else {
    //不存在相同用户

    //插入数据
    $sql = "insert into usertable(phonenumber,upsd) values('$phoneNumber','$pwd')";
    $result =  $conn->query($sql);
    if ($result) {
        $res = new Res();
        $res->status = 1;
        $res->msg = "注册成功！";
        echo  json_encode($res);
    }
    else {
        $res = new Res();
        $res->status = 2;
        $res->msg = "注册失败";
        echo  json_encode($res);
    }
    $conn->close();
}

























