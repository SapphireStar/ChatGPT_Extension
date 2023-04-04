<?php
error_reporting(0);
//第一次登陆的时候，通过用户输入的信息来确认用户
 if ( (($_POST['username']))!=NULL && (($_POST['password'])!=NULL)) {
    $userName = $_POST['username'];
    $password = $_POST['password'];
    //从db获取用户信息
    //PS：数据库连接信息改成自己的 分别为主机 数据库用户名 密码
    $conn = mysqli_connect('localhost','root','');
    mysqli_select_db($conn,'contributor');

    $sql = " SELECT username,password FROM contributor_info WHERE username = '$userName' && password = '$password'";
    $res = mysqli_query($conn,$sql);
    $row = mysqli_fetch_array($res);
    if	($row['username']!=$userName) {
        echo "<script>alert('Login failed!');</script>";
    }
    else if($row['username']==$userName&&$row['password']!=$password)
    {
        echo "<script>alert('Login failed!');</script>";
    }
    else if($row['username']!=$userName&&$row['password']!=$password) {
        echo "<script>alert('Login failed!');</script>";
    }
    
    else if($row['username']==$userName&&$row['password'] ==$password) {
        //如果密码验证通过，设置一个cookies，把用户名保存在客户端
        setcookie('username',$userName,time()+3600);//设置一个小时
        //最后跳转到登录后的欢迎页面
        // echo 'Login successful!';
        // header('Location:https://y.qq.com/n/yqq/mv/v/o0013f4q6uz.html');//跳转到最后的欢迎页面
        echo "<script>alert('Login successful！'); location.href='contributor_login.html';</script>";
    }
    }
    else {
        echo "<script>alert('Login failed!');</script>";
    }
  
if ( (($_COOKIE['username']) != null)  && (($_COOKIE['password']) != null) ) {
    $userName = $_COOKIE['username'];
    $password = $_COOKIE['password'];

    //从db获取用户信息
    //PS：数据库连接信息改成自己的 分别为主机 数据库用户名 密码
    $conn = mysqli_connect('localhost','root','','contributor');
    $res = mysqli_query($conn," SELECT username FROM contributor_info WHERE username =  '$userName' ");
    $row = mysqli_fetch_assoc($res);
    if ($row['password'] == $password) {
        //验证通过后跳转到登录后的欢迎页面
        header("location.href='contributor_login.html'" . "?username=$userName");
    }
}
else {
    echo "<script>alert('Wrong user name or password');location.href='contributor_login.html';</script>";
}


?>

