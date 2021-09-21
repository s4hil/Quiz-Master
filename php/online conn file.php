<?php
$dbhost = "";
$dbuser = "";
$dbpass = "";
$dbname = "";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) {
    echo "connection failed";
}
?>
