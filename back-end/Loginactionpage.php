<?php
$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$remember = isset($_POST['remember']) ? $_POST['remember'] : ""; 
if (!empty($username) && !empty($password)) { 
    $conn = mysqli_connect('localhost', 'root', '', 'chatgptextension'); 
    $sql_select = "SELECT username,password FROM login WHERE username = '$username' AND password = '$password'"; 
    $ret = mysqli_query($conn, $sql_select);
    $row = mysqli_fetch_array($ret); 
    if ($username == $row['username'] && $password == $row['password']) 
    { 
        if ($remember == "on") 
        {
            setcookie("", $username, time() + 7 * 24 * 3600);
        } 
        session_start();
        $_SESSION['user'] = $username; 
        
        header("Location:final.php");           //跳转到登陆以后的界面，前端把地址改一下
        mysqli_close($conn);
    }
    else 
    { 
        
        header("Location:login.php?err=1");     //跳转到登陆页面，前端把地址改一下
    }
} else { 
    header("Location:login.php?err=2");         //跳转到登陆页面
} ?>
