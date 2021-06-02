<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nextQno'])) {
    $nextQno = $data['nextQno'];
    $sql = "SELECT * FROM `quiz` WHERE `qno` = '$nextQno'";
    $res = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($res);

    if ($row) {
        echo json_encode($row);
    } else {
        echo json_encode(array('found' => false));
    }
}
