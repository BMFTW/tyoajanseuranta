<?php

session_start();

$user = $_SESSION["user"];
$user = $_REQUEST["user2"] != "" && $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user = str_replace("_", " ", $user);

$date_start = $_REQUEST["date_start"];
$date_end   = $_REQUEST["date_end"];

include "functions.php";

$output = liukuma($user, $date_start, $date_end);

echo $output;

?>