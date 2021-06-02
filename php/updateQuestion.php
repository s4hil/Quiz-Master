<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);

$qid = mysqli_real_escape_string($conn, $data['qid']);
$qno = mysqli_real_escape_string($conn, $data['qno']);
$question = mysqli_real_escape_string($conn, $data['question']);
$option1 = mysqli_real_escape_string($conn, $data['opt1']);
$option2 = mysqli_real_escape_string($conn, $data['opt2']);
$option3 = mysqli_real_escape_string($conn, $data['opt3']);
$option4 = mysqli_real_escape_string($conn, $data['opt4']);
$correct = mysqli_real_escape_string($conn, $data['correct']);

	$sql = "UPDATE `quiz` SET 
			`qno`= '$qno',
			`question`= '$question',
			`opt1`= '$option1',
			`opt2`= '$option2',
			`opt3`= '$option3',
			`opt4`= '$option4',
			`answer`= '$correct' WHERE `qid` = '$qid'";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		echo json_encode('Updated');	
	}	
	else {
		echo json_encode('Not Updated');	
	}	

?>