<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['qno'])) {
    $qno = $data['qno'];
    $selected = $data['selectedOpt'];
    $sql = "SELECT * FROM `quiz` WHERE `qno` = '$qno'";
    $res = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($res);
    if ($row['answer'] == $selected) {
        $res_array = array('answer' => 'right');
        echo json_encode($res_array);
    } else {
        $res_array = array('answer' => 'wrong', 'correct' => $row['answer']);
        echo json_encode($res_array);
    }
}
?>