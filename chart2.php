<?php

include "functions.php";

$name  = $_REQUEST["name"];
$day   = $_REQUEST["day"];
$month = $_REQUEST["month"];
$year  = $_REQUEST["year"];

echo chart2($name, $day, $month, $year);
  
?>