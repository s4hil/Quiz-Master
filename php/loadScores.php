<?php
include 'conn.php';
$sql = "SELECT *, CAST(score AS int) AS score_int FROM score_board ORDER BY score_int DESC LIMIT 10";
$res = mysqli_query($conn, $sql);
$rows = array();
	
	while ($row = mysqli_fetch_array($res)) {
		$rows[] = $row;
	}
	echo json_encode($rows);
?>