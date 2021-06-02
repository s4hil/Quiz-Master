<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	
	$qno = $data['qno'];
	$sql = "SELECT * FROM `quiz` WHERE `qno` = '$qno'";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		$row = mysqli_fetch_array($res);
		echo json_encode($row['answer']);
	}
	else {
		echo json_encode("Question not found");
	}

?>