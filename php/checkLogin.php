<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	
function clean($str)
{
	return preg_replace('/[^A-Za-z ]/', '', $str);
}

$username = $data['username']; 
$password = $data['password']; 

$username = clean($username);
$password = clean($password);

if ($username == "Sahil" && $password == "SahilParray") {
	echo json_encode(true);
}
else {
	echo json_encode(false);
}
?>