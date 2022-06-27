<?php

include("config.php");
include("SimpleXLSXGen.php");

$day           = $_REQUEST["day"];
$month         = $_REQUEST["month"];
$year          = $_REQUEST["year"];
$num_work_days = $_REQUEST["num_work_days"];
$holidays      = $_REQUEST["holidays"];
$liukumat      = $_REQUEST["liukumat"];

$holidays = explode(",", $holidays);
$holidays = preg_filter("/^/", "'", $holidays);
$holidays = preg_filter("/$/", "'", $holidays);
$holidays = implode(",", $holidays);

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

$date_start = "26." . $month1 . "." . $year1;
$date_end   = "25." . $month2 . "." . $year2;

// February & March 2022 exceptions
if ( $date_end == "25.2.2022" ) {
    $date_start = "26.1.2022";
    $date_end = "23.2.2022";
}

if ( $date_end == "25.3.2022" ) {
    $date_start = "24.2.2022";
    $date_end = "25.3.2022";
}

// Työajat
$sql_tyoajat = "

    SELECT 
        TBL1.nimi, COALESCE( SUM( " . implode(" + ", $TBL2_tyokohteet_tyoaikaaNostattavat) . " ), 0 ) AS tyoaika
    FROM 
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
    LEFT JOIN	
        ( SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND poissa != 1 AND loma != 1 ) AS TBL2
    ON 
        TBL1.nimi = TBL2.nimi
    GROUP BY 
        TBL1.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi

";

// Poissa-, sairas- & lomalkm:t
$sql_poissa_sairas_loma_lkm = "

    WITH 

        poissa_sairas_loma AS (

            SELECT 
            TBL1.nimi, COALESCE( SUM(TBL2.poissa), 0 ) AS poissa, COALESCE( SUM(TBL2.sairas), 0 ) AS sairas, COALESCE( SUM(TBL2.loma), 0 ) AS loma
            FROM 
            ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
            LEFT JOIN 
            (SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) ) AS TBL2
            ON 
            TBL1.nimi = TBL2.nimi
            GROUP BY 
            TBL1.nimi

        ), la_su_lkm AS (        

            SELECT 
            TBL1.nimi, COALESCE( SUM(TBL2.poissa), 0 ) AS poissa, COALESCE( SUM(TBL2.sairas), 0 ) AS sairas, COALESCE( SUM(TBL2.loma), 0 ) AS loma
            FROM 
            ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
            LEFT JOIN             
            (SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) IN ('Saturday', 'Sunday') ) AS TBL2
            ON 
            TBL1.nimi = TBL2.nimi
            GROUP BY 
            TBL1.nimi

        )

    SELECT
        TBL1.nimi, TBL1.poissa, TBL1.sairas, TBL1.loma, TBL2.poissa AS poissa_la_su, TBL2.sairas AS sairas_la_su, TBL2.loma AS loma_la_su
    FROM 
        poissa_sairas_loma AS TBL1
    JOIN
        la_su_lkm AS TBL2
    ON
        TBL1.nimi = TBL2.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi	

";

// Poissapvm:t
$sql_poissa_pvm = "

    SELECT 
        nimi,
        DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) AS pv,
        pvm
    FROM 
        $table
    WHERE 
        poissa = 1 AND 
        CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND 
        CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND
        pvm NOT IN ($holidays)
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(nimi), 0, CHARINDEX(' ', REVERSE(nimi)))),
        nimi,
        CONVERT(DATETIME, pvm, 104)

";

// Sairaspvm:t
$sql_sairas_pvm = "

    SELECT 
        nimi,
        DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) AS pv,
        pvm, " .
        implode(" + ", $tyokohteet_tyoaikaaNostattavat) . " AS tyoaika
    FROM 
        $table
    WHERE 
        sairas = 1 AND 
        CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND 
        CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND
        pvm NOT IN ($holidays)
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(nimi), 0, CHARINDEX(' ', REVERSE(nimi)))), 
        nimi, 
        CONVERT(DATETIME, pvm, 104)

";

// Lomapvm:t
$sql_loma_pvm = "

    SELECT 
        nimi,
        DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) AS pv,
        pvm
    FROM 
        $table
    WHERE 
        loma = 1 AND 
        CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND 
        CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND
        pvm NOT IN ($holidays)
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(nimi), 0, CHARINDEX(' ', REVERSE(nimi)))), 
        nimi, 
        CONVERT(DATETIME, pvm, 104)

";

// Sheet 1
$sheet1 = array();

// Column names
array_push($sheet1, ["Nimi", "Työaika", "Poissa", "Sairas", "Loma", "Yhteensä", "Pyöristys", "+/-", "Liukumasaldo"]);

// Nimi, työaika
$sql_data = $conn -> prepare($sql_tyoajat);
$sql_data -> execute([$date_start, $date_end]);
$sql_data = $sql_data -> fetchAll();

foreach ( $sql_data as $person ) {

    $nimi    = $person["nimi"];
    $tyoaika = $person["tyoaika"];
    $tyoaika = s_to_hms($tyoaika);

    array_push($sheet1, [$nimi, $tyoaika]);

}

// Poissa, sairas, loma
$sql_data = $conn -> prepare($sql_poissa_sairas_loma_lkm);
$sql_data -> execute([$date_start, $date_end, $date_start, $date_end]);
$sql_data = $sql_data -> fetchAll();

$i = 1;

foreach ( $sql_data as $person ) {

    $poissa = $person["poissa"];
    $sairas = $person["sairas"];
    $loma   = $person["loma"];

    $sheet1[$i] = array_merge($sheet1[$i], [$poissa, $sairas, $loma]);

    $i++;

}

// Yhteensä
$i = 1;

foreach ( $sql_data as $person ) {

    $nimi     = $sheet1[$i][0];
    $tyoaika  = hms_to_s($sheet1[$i][1]);

    $tuntipalkallinen = in_array($nimi, $tuntipalkalliset);

    $poissa = $person["poissa"];
    $sairas = $person["sairas"];
    $loma   = $person["loma"];

    $poissa_la_su = $person["poissa_la_su"];
    $sairas_la_su = $person["sairas_la_su"];
    $loma_la_su   = $person["loma_la_su"];

    if ( $tuntipalkallinen )
        $tunnit_pv = hms_to_s("00:00:00");
    else
        $tunnit_pv = hms_to_s("07:30:00");

    $yhteensa = $tyoaika + $tunnit_pv * ( $sairas - $sairas_la_su ) + $tunnit_pv * ( $loma - $loma_la_su );
    $yhteensa = s_to_hms($yhteensa);

    $sheet1[$i] = array_merge($sheet1[$i], [$yhteensa]);

    $i++;

}

// Pyöristys
for ( $i = 1; $i < count($sheet1); $i++ ) {

    $yhteensa = $sheet1[$i][5];

    $pyoristys = $yhteensa;
    $pyoristys = hms_to_s($pyoristys);
    $pyoristys = ceil( $pyoristys / 900 ) * 900;
    $pyoristys = s_to_hms($pyoristys);

    $sheet1[$i] = array_merge($sheet1[$i], [$pyoristys]);

}

// +/-
// = Yhteensä - Tunnit / kk
for ( $i = 1; $i < count($sheet1); $i++ ) {

    $nimi = $sheet1[$i][0];

    $tuntipalkallinen = in_array($nimi, $tuntipalkalliset);

    if ( $tuntipalkallinen ) {
        $sheet1[$i] = array_merge($sheet1[$i], ["-"]);
        continue;
    }

    // Yhteensä
    $yhteensa = $sheet1[$i][5];
    $yhteensa = hms_to_s($yhteensa);

    // Tunnit / kk
    $tunnit_kk = 7.5 * 3600 * (int) $num_work_days;

    // Result
    $result = $yhteensa - $tunnit_kk;
    $sign   = $result >= 0 ? "+" : "-";
    $result = abs($result);
    $result = s_to_hms($result);
    $result = $sign . $result;

    $sheet1[$i] = array_merge($sheet1[$i], [$result]);

}

// Liukumasaldo
$liukumat = str_replace("plus", "+", $liukumat);
$liukumat = explode(",", $liukumat);

for ( $i = 1; $i < count($sheet1); $i++ ) {
    $sheet1[$i] = array_merge($sheet1[$i], [$liukumat[$i-1]]);
}

// Siistiminen
for ( $i = 1; $i < count($sheet1); $i++ ) {

    $sheet1[$i][1] = "\0" . $sheet1[$i][1];
    $sheet1[$i][5] = "\0" . $sheet1[$i][5];
    $sheet1[$i][6] = "\0" . $sheet1[$i][6];
    $sheet1[$i][7] = "\0" . $sheet1[$i][7];
    $sheet1[$i][8] = "\0" . $sheet1[$i][8];

}

// Sheet 2
// Poissaolot
$sheet2 = array();

array_push($sheet2, array("Poissaolot"));
array_push($sheet2, array());

$data = array();

$sql_data = $conn -> prepare($sql_poissa_pvm);
$sql_data -> execute([$date_start, $date_end]);
$sql_data = $sql_data -> fetchAll();

foreach ( $sql_data as $person ) {

    $nimi  = $person["nimi"];
    $pv    = $person["pv"];
    $pvm   = $person["pvm"];

    if ( $pv == "Monday" )    $pv = "Ma";
    if ( $pv == "Tuesday" )   $pv = "Ti";
    if ( $pv == "Wednesday" ) $pv = "Ke";
    if ( $pv == "Thursday" )  $pv = "To";
    if ( $pv == "Friday" )    $pv = "Pe";
    if ( $pv == "Saturday" )  $pv = "La";
    if ( $pv == "Sunday" )    $pv = "Su";

    if ( count($data) > 0 && $nimi != end($data)[0] )
        array_push($data, array());

    array_push($data, array($nimi, $pv, $pvm));

}

$sheet2 = array_merge($sheet2, $data);

// Sheet 3
// Sairauspoissaolot
$sheet3 = array();

array_push($sheet3, array("Sairauspoissaolot"));
array_push($sheet3, array());

$data = array();

$sql_data = $conn -> prepare($sql_sairas_pvm);
$sql_data -> execute([$date_start, $date_end]);
$sql_data = $sql_data -> fetchAll();

foreach ( $sql_data as $person ) {

    $nimi    = $person["nimi"];
    $pv      = $person["pv"];
    $pvm     = $person["pvm"];
    $tyoaika = $person["tyoaika"];

    if ( $pv == "Monday" )    $pv = "Ma";
    if ( $pv == "Tuesday" )   $pv = "Ti";
    if ( $pv == "Wednesday" ) $pv = "Ke";
    if ( $pv == "Thursday" )  $pv = "To";
    if ( $pv == "Friday" )    $pv = "Pe";
    if ( $pv == "Saturday" )  $pv = "La";
    if ( $pv == "Sunday" )    $pv = "Su";

    $tyoaika = s_to_hms($tyoaika);
    $tyoaika = $tyoaika == "00:00:00" ? "-" : $tyoaika;
    $tyoaika = "\0" . $tyoaika;

    if ( count($data) > 0 && $nimi != end($data)[0] )
        array_push($data, array());

    array_push($data, array($nimi, $pv, $pvm, $tyoaika));

}

$sheet3 = array_merge($sheet3, $data);

// Sheet 4
// Lomat
$sheet4 = array();

array_push($sheet4, array("Lomat"));
array_push($sheet4, array());

$data = array();

$sql_data = $conn -> prepare($sql_loma_pvm);
$sql_data -> execute([$date_start, $date_end]);
$sql_data = $sql_data -> fetchAll();

foreach ( $sql_data as $person ) {

    $nimi  = $person["nimi"];
    $pv    = $person["pv"];
    $pvm   = $person["pvm"];

    if ( $pv == "Monday" )    $pv = "Ma";
    if ( $pv == "Tuesday" )   $pv = "Ti";
    if ( $pv == "Wednesday" ) $pv = "Ke";
    if ( $pv == "Thursday" )  $pv = "To";
    if ( $pv == "Friday" )    $pv = "Pe";
    if ( $pv == "Saturday" )  $pv = "La";
    if ( $pv == "Sunday" )    $pv = "Su";

    if ( count($data) > 0 && $nimi != end($data)[0] )
        array_push($data, array());

    array_push($data, array($nimi, $pv, $pvm));

}

$sheet4 = array_merge($sheet4, $data);

// Generate Excel file
$xlsx = new SimpleXLSXGen();

$xlsx -> addSheet( $sheet1, "Työajat" );
$xlsx -> addSheet( $sheet2, "Poissa"  );
$xlsx -> addSheet( $sheet3, "Sairas"  );
$xlsx -> addSheet( $sheet4, "Loma"    );

if ( $day <= 25 )
$filename = "tyotunnit_" . $month . "_" . $year . ".xlsx";
else
$filename = "tyotunnit_" . $next_month . "_" . $next_year . ".xlsx";

$xlsx -> saveAs($filename);

// Convert seconds to hh:mm:ss
function s_to_hms($input) {

    $h = floor( $input / 3600 );
    $m = floor( ( $input - 3600 * $h ) / 60 );
    $s = $input - 3600 * $h - 60 * $m;

    $h = ( $h < 10 ) ? "0" . $h : $h;
    $m = ( $m < 10 ) ? "0" . $m : $m;
    $s = ( $s < 10 ) ? "0" . $s : $s;

    return $h . ":" . $m . ":" . $s;

}

// Convert hh:mm:ss to seconds
function hms_to_s($input) {

  $hms = explode(":", $input);

  $h = (int) $hms[0];
  $m = (int) $hms[1];
  $s = (int) $hms[2];

  return 3600 * $h + 60 * $m + 1 * $s;

}
  
?>