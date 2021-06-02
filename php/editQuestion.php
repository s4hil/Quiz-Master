<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	$id = $data['qid'];
	$sql = "SELECT * FROM `quiz` WHERE `qid` = '$id'";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		$row = mysqli_fetch_array($res);
		echo json_encode($row);
	}
	else {
		echo json_encode("Failed To fetch");
	}
?>