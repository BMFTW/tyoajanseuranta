<?php

if ( session_status() === PHP_SESSION_NONE ) {
    session_start();
}

$server  = "XXX";
$db      = "XXX";
$db_user = "XXX";
$db_pwd  = "XXX";
$table   = "XXX";

$conn = new PDO("sqlsrv:Server=$server;Database=$db", $db_user, $db_pwd);

$tyokohteet = [

    "toissa",
    "tj_tuki",
    "tj_kehitys",
    "love_tuki",
    "love_yllapito",
    "love_sisallontuotanto",
    "muut_verkkokurssit_tuki",
    "muut_verkkokurssit_yllapito",
    "muut_verkkokurssit_sisallontuotanto",
    "muut_tuotteet_tuki",
    "muut_tuotteet_kehitys",
    "eloki",
    "yhteiset_tyokalut",
    "testaus",
    "nettisivut",
    "verkkoinfrastruktuuri",
    "microsoft_365",
    "ruotsinnos",
    "las_ruotsinnos",
    "ger_ruotsinnos",
    "naytto",
    "psyk",
    "syto",
    "sopimukset_tarjoukset",
    "sisainen_viestinta",
    "sisaiset_palaverit",
    "asiakasviestinta",
    "asiakaspalaverit",
    "koulutukset",
    "koulutusten_valmistelu",
    "taloushallinto",
    "hallinnointipalvelut",
    "henkilostohallinto",
    "laatutyo",
    "laskutettava_tuntityo",
    "tyomatkat",
    "happihyppely",
    "palkallinen_poissaolo",
    "lounastauko",
    "liukumavahennys"

];

$tuntipalkalliset = array (

    "Roope Anttila",
    "Heli Haavisto",
    "Elina Hanslian",
    "Simo Korpela",
    "Eeli Kuosmanen",
    "Tuukka Monto",
    "Elisa Mäkinen",
    "Päivi Palonen",
    "Riikka Panu",
    "Hillevi Rautiainen",
    "Oskari Riihimäki",
    "Emma Ruotsalainen",
    "Jaakko Saano",
    "Kaisa Saano",
    "Susanna Saano"

);

$tyokohteet_tyoaikaaNostattavat      = array_filter($tyokohteet, function($value) { return $value != "lounastauko" && $value != "liukumavahennys"; } );
$TBL2_tyokohteet_tyoaikaaNostattavat = preg_filter("/^/", "TBL2.", $tyokohteet_tyoaikaaNostattavat);

?>
