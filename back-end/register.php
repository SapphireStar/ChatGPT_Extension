<?php


error_reporting(0);

$username = ($_POST['username']);

$password = trim($_POST['password']);



$conn = mysqli_connect('localhost', 'root', '');      

//如果有错误，存在错误号
if (mysqli_errno($conn)) {

    echo mysqli_error($conn);

    exit;
}

mysqli_select_db($conn, 'contributor');   //选择数据库

mysqli_set_charset($conn, 'utf8');   //选择字符集

$sql = "SELECT username,password FROM contributor_info WHERE username = '$username' && password = '$password'";

$result = mysqli_query($conn,$sql);//针对user这个数据库进行查询, 查询是否存在有这个用户

$row = mysqli_num_rows($result);//输出查询结果，传给$row


if($_POST['username']==NULL){

    echo "<script>alert('Username can not be empty');location.href='register.html';</script>";

}
else if($_POST['password']== NULL){

    echo "<script>alert('Password can not be empty');location.href='register.html';</script>";

}
else{

    if($row){

        echo "<script>alert('Username already exists');location.href='register.html';</script>";

    }else{
        
        $sql1 = "INSERT INTO contributor_info (username,password) values ('".$username."','".$password."')";//PHP MySQL 插入数据

        $result = mysqli_query($conn, $sql1);//判断插入数据是否成功

        $row = mysqli_num_rows($result);

        if($row){
          
            echo "<script>alert('Registration failed!');location.href='register.html';</script>";
            	
        }else{
            
            echo "<script>alert('Registration success!');location.href='index.html';</script>";
        }
    }
}




mysqli_close($conn);

?>


