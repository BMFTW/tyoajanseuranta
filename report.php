<?php

include "functions.php";

$day           = $_REQUEST["day"];
$month         = $_REQUEST["month"];
$year          = $_REQUEST["year"];
$num_work_days = $_REQUEST["num_work_days"];
$holidays      = $_REQUEST["holidays"];
$liukumat      = $_REQUEST["liukumat"];

report($day, $month, $year, $num_work_days, $holidays, $liukumat);
  
?>