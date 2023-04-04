<form action="registeraction.php" method="post"> <table border="0">
<?php
$err = isset($_GET["err"]) ? $_GET["err"] : "";
switch ($err) {
    case 1:
        echo "User name is already exist！";
        break;

    case 2:
        echo "password not equal to repeat password！";
        break;
}
?>
