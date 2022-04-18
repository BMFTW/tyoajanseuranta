<?php

session_start();

$date_start = $_REQUEST["date_start"];
$date_end   = $_REQUEST["date_end"];

include "functions.php";

$output = liukumat($date_start, $date_end);

echo $output;
  
?>