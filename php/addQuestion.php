<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);

$qno = mysqli_real_escape_string($conn, $data['qno']);
$question = mysqli_real_escape_string($conn, $data['question']);
$option1 = mysqli_real_escape_string($conn, $data['opt1']);
$option2 = mysqli_real_escape_string($conn, $data['opt2']);
$option3 = mysqli_real_escape_string($conn, $data['opt3']);
$option4 = mysqli_real_escape_string($conn, $data['opt4']);
$correct = mysqli_real_escape_string($conn, $data['correct']);

$sql = "INSERT INTO `quiz`(`qno`, `question`, `opt1`, `opt2`, `opt3`, `opt4`, `answer`) 
		VALUES ('$qno','$question','$option1','$option2','$option3','$option4','$correct')";

$res = mysqli_query($conn, $sql);

if ($res) {
	$status = "Added!";
}
else {
	$status = "Not Added!";
}

echo json_encode($status);

?>	