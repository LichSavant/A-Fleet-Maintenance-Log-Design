<?php

session_start();

$conn = new mysqli(

"localhost",

"root",

"",

"fleet_system"

);

if($conn->connect_error){

die("Database Connection Failed : "
.$conn->connect_error);

}
?>
