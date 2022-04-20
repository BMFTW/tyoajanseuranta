<?php

include("config.php");

$user = $_SESSION["user"];
$user = $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user = str_replace("_", " ", $user);

$day   = $_REQUEST["day"];
$month = $_REQUEST["month"];
$year  = $_REQUEST["year"];

$user = str_replace("_", " ", $user);

$day1 = 26;
$day2 = 25;

// February & March 2022 exceptions
if ( ( $day >= 26 && $month == 1 && $year == 2022 ) || ( $day <= 23 && $month == 2 && $year == 2022 ) )
    $day2 = 23;

if ( ( $day >= 24 && $month == 2 && $year == 2022 ) || ( $day <= 25 && $month == 3 && $year == 2022 ) )
    $day1 = 24;

if ( $day <= 25 ) {

$previous_month = ( $month - 1 != 0 ) ? $month - 1 : 12;
$previous_year  = ( $month - 1 != 0 ) ? $year : $year - 1;

$month1 = $previous_month;
$month2 = $month;
$year1  = $previous_year;
$year2  = $year;

} else {

$next_month = ( $month + 1 != 13 ) ? $month + 1 : 1;
$next_year  = ( $month + 1 != 13 ) ? $year : $year + 1;

$month1 = $month;
$month2 = $next_month;
$year1  = $year;
$year2  = $next_year;

}

$sql = "

SELECT 
    pvm, " . 
    implode(" + ", $tyokohteet_tyoaikaaNostattavat) . " AS tyoaika
FROM 
    $table
WHERE 
    nimi = ? AND 
    CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, '$day1.$month1.$year1', 104) AND 
    CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, '$day2.$month2.$year2', 104) AND 
    poissa != 1 AND loma != 1
ORDER BY 
    CONVERT(DATETIME, pvm, 104)

";

$sql2 = "
    
SELECT 
    pvm, " .
    implode(" + ", $tyokohteet_tyoaikaaNostattavat) . " AS tyoaika,
    CASE
        WHEN poissa = 1 THEN 'poissa'
        WHEN sairas = 1 THEN 'sairas'
        WHEN loma   = 1 THEN 'loma'
    END AS poissa_sairas_loma
FROM 
    $table
WHERE 
    nimi = ? AND 
    CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, '$day1.$month1.$year1', 104) AND 
    CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, '$day2.$month2.$year2', 104) AND 
    ( poissa = 1 OR sairas = 1 OR loma = 1 )
ORDER BY 
    CONVERT(DATETIME, pvm, 104)

";

$result = $conn -> prepare($sql);
$result -> execute([$user]);
$result = $result -> fetchAll();

$output = array();

foreach ( $result as $row ) {
$day = explode(".", $row["pvm"])[0];
$tyoaika = $row["tyoaika"];
array_push( $output, array( $day => $tyoaika ) );
}

$result2 = $conn -> prepare($sql2);
$result2 -> execute([$user]);
$result2 = $result2 -> fetchAll();

foreach ( $result2 as $row ) {
$day = explode(".", $row["pvm"])[0];
$poissa_sairas_loma = $row["poissa_sairas_loma"];
if ( $poissa_sairas_loma == "sairas" ) $poissa_sairas_loma .= ";" . $row["tyoaika"];
    array_push( $output, array( $day => $poissa_sairas_loma ) );
}

// February & March 2022 exceptions
if ( isset($output[0][24]) || isset($output[1][25]) ) {

    $output[0]["24.2."] = $output[0][24];
    unset($output[0][24]);

    $output[1]["25.2."] = $output[1][25];
    unset($output[1][25]);

}

$output = empty($output) ? array( "0" => 0 ) : $output;

$output = json_encode($output);

echo $output;
  
?>