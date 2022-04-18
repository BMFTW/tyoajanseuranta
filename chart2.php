<?php

session_start();

$user          = $_SESSION["user"];
$user          = $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user          = str_replace("_", " ", $user);

$day   = $_REQUEST["day"];
$month = $_REQUEST["month"];
$year  = $_REQUEST["year"];

include "functions.php";

$output =  chart2($user, $day, $month, $year);

echo $output;
  
?>