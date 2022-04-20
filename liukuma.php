<?php

include("config.php");

$user = $_SESSION["user"];
$user = $_REQUEST["user2"] != "" && $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user = str_replace("_", " ", $user);

$date_start = $_REQUEST["date_start"];
$date_end   = $_REQUEST["date_end"];

$output = array();

$sql  = "SELECT SUM(" . implode(" + ", $tyokohteet_tyoaikaaNostattavat) . ") AS sum FROM $table ";
$sql .= "WHERE nimi = ? AND poissa != 1 AND loma != 1 AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104)";

$sum = $conn -> prepare($sql);
$sum -> execute([$user, $date_start, $date_end]);
$sum = $sum -> fetch();
$sum = $sum["sum"];
$sum = ( $sum != "" ) ? $sum : 0;

array_push($output, $sum);

$sql  = "SELECT SUM(poissa) AS poissa FROM $table WHERE nimi = ? AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
$sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

$poissa = $conn -> prepare($sql);
$poissa -> execute([$user, $date_start, $date_end]);
$poissa = $poissa -> fetch();
$poissa = $poissa["poissa"];
$poissa = ( $poissa != "" ) ? $poissa : 0;

array_push($output, $poissa);

$sql  = "SELECT SUM(sairas) AS sairas FROM $table WHERE nimi = ? AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
$sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

$sairas = $conn -> prepare($sql);
$sairas -> execute([$user, $date_start, $date_end]);
$sairas = $sairas -> fetch();
$sairas = $sairas["sairas"];
$sairas = ( $sairas != "" ) ? $sairas : 0;

array_push($output, $sairas);

$sql  = "SELECT SUM(loma) AS loma FROM $table WHERE nimi = ? AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
$sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

$loma = $conn -> prepare($sql);
$loma -> execute([$user, $date_start, $date_end]);
$loma = $loma -> fetch();
$loma = $loma["loma"];
$loma = ( $loma != "" ) ? $loma : 0;

array_push($output, $loma);

$output = json_encode($output);

echo $output;

?>