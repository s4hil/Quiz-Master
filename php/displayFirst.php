<?php
require_once 'conn.php';

$rawData = file_get_contents("php://input");

$data = json_decode($rawData, true);

if ($data['action'] == 'displayFirst') {
    $sql = "SELECT * FROM `quiz` WHERE `qno` = 1";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query);
    if ($row) {
        echo json_encode($row);
    } else {
        echo "Error";
    }
}
