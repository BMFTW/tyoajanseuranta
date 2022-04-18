<?php

session_start();  

$user          = $_SESSION["user"];
$user          = $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user          = str_replace("_", " ", $user);

$day           = $_REQUEST["day"];
$month         = $_REQUEST["month"];
$year          = $_REQUEST["year"];
$person        = $_REQUEST["person"];
$salary_period = $_REQUEST["salary_period"];

include "functions.php";

$output = getStats($user, $day, $month, $year, $person, $salary_period);

echo $output;
  
?>