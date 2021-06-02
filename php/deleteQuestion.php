<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	
	$qid = $data['qid'];
	$sql = "DELETE FROM `quiz` WHERE `qno` = '$qid'";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		echo json_encode("Deleted!");
	}
	else {
		echo json_encode("Not Deleted!");
	}
	
?>