<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	
	function clean($str)
	{
		return preg_replace('/[^A-Za-z ]/', '', $str);
	}


	$name = clean($data['player']);
	$score = $data['score'];

	$name = mysqli_real_escape_string($conn, $name);
	$score = mysqli_real_escape_string($conn, $score);

	$sql = "INSERT INTO `score_board` (`name`, `score`) VALUES ('$name', '$score')";

	$res = mysqli_query($conn, $sql);
	if ($res) {
		echo json_encode("Saved");
	}
	else {
		echo json_encode("Not Saved");
	}
?>