<?php

include("config.php");

$timers = $_REQUEST["timers"];

$user = $_REQUEST["user"];
$user = str_replace("_", " ", $user);

$date = date("j.n.Y");

$sql = "UPDATE $table SET timers = ? WHERE nimi = ? AND pvm = ?";

$conn -> prepare($sql) -> execute([$timers, $user, $date]);

?>