<?php

include("config.php");

$user          = $_SESSION["user"];
$user          = $_REQUEST["user2"] != "0" && $_REQUEST["user2"] != "1" ? $_REQUEST["user2"] : $user;
$user          = str_replace("_", " ", $user);

$day           = $_REQUEST["day"];
$month         = $_REQUEST["month"];
$year          = $_REQUEST["year"];
$person        = $_REQUEST["person"];
$salary_period = $_REQUEST["salary_period"];

if ( $person == "0" )
    $user = "";

$sql = "SELECT ";

for ( $i = 0; $i < count($tyokohteet); $i++ ) {
    $sql .= "SUM(" . $tyokohteet[$i] . "), ";
}

$sql = rtrim($sql, ", ");

$sql .= " FROM $table ";

if ( $salary_period == "0" ) {

    if ( $user != '' && $day == '' && $month == '' && $year == '' )
        $sql .= "WHERE nimi = '$user'";
    else if ( $user == '' && $day !== '' && $month == '' && $year == '' )
        $sql .= "WHERE pvm LIKE '$day.%.%'";
    else if ( $user !== '' && $day !== '' && $month == '' && $year == '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '$day.%.%'";
    else if ( $user == '' && $day == '' && $month !== '' && $year == '' )
        $sql .= "WHERE pvm LIKE '%.$month.%'";
    else if ( $user !== '' && $day == '' && $month !== '' && $year == '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '%.$month.%'";
    else if ( $user == '' && $day !== '' && !$month == '' && $year == '' )
        $sql .= "WHERE pvm LIKE '$day.$month.%'";
    else if ( $user !== '' && $day !== '' && $month !== '' && $year == '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '$day.$month.%'";
    else if ( $user == '' && $day == '' && $month == '' && $year !== '' )
        $sql .= "WHERE pvm LIKE '%.%.$year'";
    else if ( $user !== '' && $day == '' && $month == '' && $year !== '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '%.%.$year'";
    else if ( $user == '' && $day !== '' && $month == '' && $year !== '' )
        $sql .= "WHERE pvm LIKE '$day.%.$year'";
    else if ( $user !== '' && !$day == '' && $month == '' && $year !== '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '$day.%.$year'";
    else if ( $user == '' && $day == '' && $month !== '' && $year !== '' )
        $sql .= "WHERE pvm LIKE '%.$month.$year'";
    else if ( $user !== '' && $day == '' && $month !== '' && $year !== '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '%.$month.$year'";
    else if ( $user == '' && $day !== '' && $month !== '' && $year !== '' )
        $sql .= "WHERE pvm LIKE '$day.$month.$year'";
    else if ( $user !== '' && $day !== '' && $month !== '' && $year !== '' )
        $sql .= "WHERE nimi = '$user' AND pvm LIKE '$day.$month.$year'";

}

else if ( $salary_period == "1" ) {

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

$day1 = 26;
$day2 = 25;

// February & March 2022 exceptions
if ( ( $day >= 26 && $month == 1 && $year == 2022 ) || ( $day <= 23 && $month == 2 && $year == 2022 ) )
    $day2 = 23;

if ( ( $day >= 24 && $month == 2 && $year == 2022 ) || ( $day <= 25 && $month == 3 && $year == 2022 ) )
    $day1 = 24;

$sql .= "WHERE nimi = '$user'";
$sql .= " AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, '$day1.$month1.$year1', 104)";
$sql .= " AND ";
$sql .= "CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, '$day2.$month2.$year2', 104)";
$sql .= " AND ";
$sql .= "poissa != 1 AND loma != 1";

}

$result = $conn -> query($sql) -> fetch();

for ( $i = 0; $i < count($tyokohteet); $i++ ) {
    $result[$tyokohteet[$i]] = $result[$i];
    unset($result[$i]);
}

// Poissa, sairas & loma
$sql = str_replace(" AND poissa != 1 AND loma != 1", "", $sql);

$sql = "SELECT SUM(poissa) AS poissa, SUM(sairas) AS sairas, SUM(loma) AS loma " . strstr($sql, "FROM");

$result2 = $conn -> query($sql) -> fetch();

$result["poissa"] = isset($result2["poissa"]) ? $result2["poissa"] : 0;
$result["sairas"] = isset($result2["sairas"]) ? $result2["sairas"] : 0;
$result["loma"]   = isset($result2["loma"])   ? $result2["loma"]   : 0;

$result = json_encode($result);

echo $result;
  
?>