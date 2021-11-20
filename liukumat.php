<?php

  session_start();

  include "functions.php";

  $date_start = $_REQUEST["date_start"];
  $date_end   = $_REQUEST["date_end"];

  $output = liukumat($date_start, $date_end);

  echo $output;
  
?>