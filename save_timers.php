<?php

session_start();

$user   = $_SESSION["user"];
$date   = $_SESSION["date_today"];
$timers = $_REQUEST["timers"];

include "functions.php";
saveTimers($user, $date, $timers);
  
?>