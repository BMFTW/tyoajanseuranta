<?php

include("config.php");

$user = $_SESSION["user"];
$date = $_SESSION["date_today"];

if ( $user == "" || $user == "undefined" ) {
    return false;
}

$sql = "SELECT timers FROM $table WHERE nimi = ? AND pvm = ?";

$result = $conn -> prepare($sql);
$result -> execute([$user, $date]);
$result = $result -> fetch();

if ( empty($result) ) {

    $timers  = "[ "; 
    $timers .= str_repeat( '{ "running": false, "startTime": 0, "lastStartTime": 0, "pauseStartTime": 0, "pauseLength": 0, "notified": false }, ', count($tyokohteet) );
    $timers .= '{ "poissa": 0, "sairas": 0, "loma": 0 }';
    $timers .= " ]";

    $sql_insert = "INSERT INTO $table (nimi, pvm, " . implode(", ", $tyokohteet) . ", poissa, sairas, loma, timers) VALUES (?, ?, " . str_repeat( "0, ", count($tyokohteet) + 3 ) . "?)";
    $conn -> prepare($sql_insert) -> execute([$user, $date, $timers]);

    $result = $conn -> prepare($sql);
    $result -> execute([$user, $date]);
    $result = $result -> fetch();

}

$timers = $result["timers"];

echo $timers;
  
?>