<?php

include("config.php");

$user   = $_SESSION["user"];
$date   = $_SESSION["date_today"];
$timers = $_REQUEST["timers"];

$user = str_replace("_", " ", $user);

$sql = "UPDATE $table SET timers = ? WHERE nimi = ? AND pvm = ?";

$conn -> prepare($sql) -> execute([$timers, $user, $date]);

?>