<?php

  session_start();

  include "functions.php";

  $name            = $_REQUEST["name"];
  $day             = $_REQUEST["day"];
  $month           = $_REQUEST["month"];
  $year            = $_REQUEST["year"];
  $salary_period   = isset($_REQUEST["salary_period"]) ? $_REQUEST["salary_period"] : "";

  $output = getStats($name, $day, $month, $year, $salary_period);

  echo $output;
  
?>