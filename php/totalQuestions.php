<?php
require_once 'conn.php';

$sql = "SELECT * FROM `quiz`";
$res = mysqli_query($conn, $sql);
$rows = mysqli_num_rows($res);

echo json_encode(array("total" => $rows));
