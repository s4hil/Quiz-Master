<?php
$dbhost = "localhost";
$dbuser = "id16903512_alphacoder";
$dbpass = "Sahil@889675123";
$dbname = "id16903512_alphacoders";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) {
    echo "connection failed";
}
?>