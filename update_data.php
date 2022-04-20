<?php

include("config.php");

$user   = $_SESSION["user"];

$date   = $_REQUEST["date"];
$time1  = $_REQUEST["toissa"];
$time2  = $_REQUEST["tj_tuki"];
$time3  = $_REQUEST["tj_kehitys"];
$time4  = $_REQUEST["love_tuki"];
$time5  = $_REQUEST["love_yllapito"];
$time6  = $_REQUEST["love_sisallontuotanto"];
$time7  = $_REQUEST["muut_verkkokurssit_tuki"];
$time8  = $_REQUEST["muut_verkkokurssit_yllapito"];
$time9  = $_REQUEST["muut_verkkokurssit_sisallontuotanto"];
$time10 = $_REQUEST["muut_tuotteet_tuki"];
$time11 = $_REQUEST["muut_tuotteet_kehitys"];
$time12 = $_REQUEST["eloki"];
$time13 = $_REQUEST["yhteiset_tyokalut"];
$time14 = $_REQUEST["testaus"];
$time15 = $_REQUEST["nettisivut"];
$time16 = $_REQUEST["verkkoinfrastruktuuri"];
$time17 = $_REQUEST["microsoft_365"];
$time18 = $_REQUEST["ruotsinnos"];
$time19 = $_REQUEST["las_ruotsinnos"];
$time20 = $_REQUEST["ger_ruotsinnos"];
$time21 = $_REQUEST["naytto"];
$time22 = $_REQUEST["psyk"];
$time23 = $_REQUEST["syto"];
$time24 = $_REQUEST["sopimukset_tarjoukset"];
$time25 = $_REQUEST["sisainen_viestinta"];
$time26 = $_REQUEST["sisaiset_palaverit"];
$time27 = $_REQUEST["asiakasviestinta"];
$time28 = $_REQUEST["asiakaspalaverit"];
$time29 = $_REQUEST["koulutukset"];
$time30 = $_REQUEST["koulutusten_valmistelu"];
$time31 = $_REQUEST["taloushallinto"];
$time32 = $_REQUEST["hallinnointipalvelut"];
$time33 = $_REQUEST["henkilostohallinto"];
$time34 = $_REQUEST["laatutyo"];
$time35 = $_REQUEST["laskutettava_tuntityo"];
$time36 = $_REQUEST["tyomatkat"];
$time37 = $_REQUEST["happihyppely"];
$time38 = $_REQUEST["palkallinen_poissaolo"];
$time39 = $_REQUEST["lounastauko"];
$time40 = $_REQUEST["liukumavahennys"];
$poissa = $_REQUEST["poissa"];
$sairas = $_REQUEST["sairas"];
$loma   = $_REQUEST["loma"];
$timers = isset($_REQUEST["timers"]) ? $_REQUEST["timers"] : "";

$times = [ $time1, $time2, $time3, $time4, $time5, $time6, $time7, $time8, $time9, $time10, $time11, $time12, $time13, $time14, $time15, $time16, $time17, $time18, $time19, $time20, $time21, $time22, $time23, $time24, $time25, $time26, $time27, $time28, $time29, $time30, $time31, $time32, $time33, $time34, $time35, $time36, $time37, $time38, $time39, $time40 ] ;

$sql = "SELECT * FROM $table WHERE nimi = ? AND pvm = ?";

$result = $conn -> prepare($sql);
$result -> execute([$user, $date]);
$result = $result -> fetch();

if ( empty($result) ) {

    $sql_insert = "INSERT INTO $table (nimi, pvm, " . implode(", ", $tyokohteet) . ", poissa, sairas, loma, timers) VALUES (?, ?, " . str_repeat( "0, ", count($tyokohteet) + 3 ) . "?)";
    $conn -> prepare($sql_insert) -> execute([$user, $date, $timers]);

}

$sql = "UPDATE $table SET ";

for ( $i = 0; $i < count($tyokohteet); $i++ ) {
    $sql .= $tyokohteet[$i] . " = " . strval($times[$i])  . ", ";
}

$sql .= "poissa = $poissa, sairas = $sairas, loma = $loma";

if ( $timers != "" )
    $sql .= ", timers = '" . $timers . "'";

$sql .= " WHERE nimi = ? AND pvm = ?";
 
$conn -> prepare($sql) -> execute([$user, $date]);
 
?>