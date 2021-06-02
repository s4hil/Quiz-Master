<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$sql = "DELETE FROM `score_board` WHERE `id`= '$id'";
$res = mysqli_query($conn, $sql);
if ($res) {
	echo json_encode("Deleted");
}
else {
	echo json_encode("Not Deleted");
}