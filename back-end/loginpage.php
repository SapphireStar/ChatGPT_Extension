<form action="loginaction.php" method="post">
<?php
$err = isset($_GET["err"]) ? $_GET["err"] : "";
switch ($err) {
    case 1:
        echo "Wrong Username or password！";
        break;

    case 2:
        echo "Username and password can't be null！";
        break;
} ?>
