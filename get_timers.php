<?php

session_start();

$user = $_SESSION["user"];
$date = $_SESSION["date_today"];

include "functions.php";

$output = getTimers($user, $date);

echo $output;
  
?>