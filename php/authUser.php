<?php
include 'conn.php';
$data = json_decode(file_get_contents("php://input"), true);
	
function clean($str)
{
	return preg_replace('/[^A-Za-z ]/', '', $str);
}


$username = clean($username);
$password = clean($password);

if ($username == "Sahil" && $password == "SahilParray") {
	$res = array();
	$res['loggedIn'] = true;
	$res['auth'] = "Success";
	echo json_encode($res);
}
else {
	echo json_encode("Something Went Wrong");
}