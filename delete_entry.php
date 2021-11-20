<?php

  include "functions.php";

  $name = $_REQUEST["name"];
  $date = $_REQUEST["date"];
  
  deleteEntry($name, $date);
  
?>