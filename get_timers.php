<?php

  session_start();

  include "functions.php";

  $name = $_REQUEST["name"];
  $date = $_REQUEST["date"];
  
  $output = getTimers($name, $date);

  echo $output;
  
?>