<?php
$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$re_password = isset($_POST['re_password']) ? $_POST['re_password'] : "";

if ($password == $re_password) { 
    $conn = mysqli_connect("localhost", "root", "", "chatgptextension"); 
    $sql_select = "SELECT username FROM login WHERE username = '$username'"; 
    $ret = mysqli_query($conn, $sql_select);
    $row = mysqli_fetch_array($ret); 
    if ($username == $row['username']) { 
        header("Location:register.php?err=1");                          //跳转到注册界面
    } else { 
        $sql_insert = "INSERT INTO login(username,password) 
VALUES('$username','$password')"; 
        mysqli_query($conn, $sql_insert);
        header("Location:login.php");                           //跳转回登录界面，或者直接改成登陆以后能看到的界面也行
    } 
    mysqli_close($conn);
} else {
    header("Location:register.php?err=2");                      //继续注册，跳转到注册界面
} ?>
