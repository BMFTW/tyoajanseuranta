<?php

  include "functions.php";

  $name   = $_REQUEST["name"];
  $date   = $_REQUEST["date"];
  $timers = $_REQUEST["timers"];
  
  saveTimers($name, $date, $timers);
  
?>