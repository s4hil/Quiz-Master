<?php
include 'conn.php';

$sql = "SELECT * FROM `quiz` ORDER BY `qno` DESC LIMIT 1";

$res = mysqli_query($conn, $sql);

$row = mysqli_fetch_array($res);
	
	if ($row) {
		$qno = $row['qno'];
		echo json_encode($qno);
	}

