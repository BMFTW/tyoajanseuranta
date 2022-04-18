<?php

session_start();

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
$time12 = $_REQUEST["yhteiset_tyokalut"];
$time13 = $_REQUEST["testaus"];
$time14 = $_REQUEST["nettisivut"];
$time15 = $_REQUEST["verkkoinfrastruktuuri"];
$time16 = $_REQUEST["microsoft_365"];
$time17 = $_REQUEST["ruotsinnos"];
$time18 = $_REQUEST["las_ruotsinnos"];
$time19 = $_REQUEST["ger_ruotsinnos"];
$time20 = $_REQUEST["naytto"];
$time21 = $_REQUEST["psyk"];
$time22 = $_REQUEST["syto"];
$time23 = $_REQUEST["sopimukset_tarjoukset"];
$time24 = $_REQUEST["sisainen_viestinta"];
$time25 = $_REQUEST["sisaiset_palaverit"];
$time26 = $_REQUEST["asiakasviestinta"];
$time27 = $_REQUEST["asiakaspalaverit"];
$time28 = $_REQUEST["koulutukset"];
$time29 = $_REQUEST["koulutusten_valmistelu"];
$time30 = $_REQUEST["taloushallinto"];
$time31 = $_REQUEST["hallinnointipalvelut"];
$time32 = $_REQUEST["henkilostohallinto"];
$time33 = $_REQUEST["laatutyo"];
$time34 = $_REQUEST["laskutettava_tuntityo"];
$time35 = $_REQUEST["tyomatkat"];
$time36 = $_REQUEST["happihyppely"];
$time37 = $_REQUEST["palkallinen_poissaolo"];
$time38 = $_REQUEST["lounastauko"];
$time39 = $_REQUEST["liukumavahennys"];
$poissa = $_REQUEST["poissa"];
$sairas = $_REQUEST["sairas"];
$loma   = $_REQUEST["loma"];
$timers = isset($_REQUEST["timers"]) ? $_REQUEST["timers"] : "";

$times = [ $time1, $time2, $time3, $time4, $time5, $time6, $time7, $time8, $time9, $time10, $time11, $time12, $time13, $time14, $time15, $time16, $time17, $time18, $time19, $time20, $time21, $time22, $time23, $time24, $time25, $time26, $time27, $time28, $time29, $time30, $time31, $time32, $time33, $time34, $time35, $time36, $time37, $time38, $time39] ;

include "functions.php";
updateData($user, $date, $times, $poissa, $sairas, $loma, $timers);
  
?>