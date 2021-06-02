<?php
include 'conn.php';
	
$sql = "SELECT * FROM `quiz`";
$res = mysqli_query($conn, $sql);
$questions = array();
while ($row = mysqli_fetch_array($res)) {
		$questions[] = $row;
	}	
	echo json_encode($questions, JSON_PRETTY_PRINT);

?>