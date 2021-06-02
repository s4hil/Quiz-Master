<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "quiz_master";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) {
    echo "connection failed";
}
