<?php

  session_start();

  include "functions.php";

  $name       = $_REQUEST["name"];
  $date_start = $_REQUEST["date_start"];
  $date_end   = $_REQUEST["date_end"];

  $output = liukuma($name, $date_start, $date_end);

  echo $output;
  
?>