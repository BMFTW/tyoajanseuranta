<?php

include "SimpleXLSXGen.php";

$server = "83.150.87.73";
$db     = "master";
$user   = "haipro";
$pwd    = "haipro";
$table  = "tyoajanseuranta";

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

$tyokohteet_tyoaikaaNostattavat = array_filter($tyokohteet, function($value) { return $value != "lounastauko" && $value != "liukumavahennys"; } );

$tuntipalkalliset = array("Roope Anttila", "Heli Haavisto", "Elina Hanslian", "Simo Korpela", "Eeli Kuosmanen", "Tuukka Monto", "Elisa Mäkinen", "Riikka Panu", "Hillevi Rautiainen", "Oskari Riihimäki", "Emma Ruotsalainen", "Jaakko Saano", "Kaisa Saano", "Susanna Saano");

function getTimers($name, $date) {

  global $server, $db, $user, $pwd, $table, $tyokohteet;

  if ( $name == "" || $name == "undefined" ) {
    return false;
  }

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "SELECT timers FROM $table WHERE nimi = ? AND pvm = ?";

  $result = $conn -> prepare($sql);
  $result -> execute([$name, $date]);
  $result = $result -> fetch();

  if ( empty($result) ) {

    $timers  = "[ "; 
    $timers .= str_repeat( '{ "running": false, "startTime": 0, "lastStartTime": 0, "pauseStartTime": 0, "pauseLength": 0, "notified": false }, ', count($tyokohteet) );
    $timers .= '{ "poissa": 0, "sairas": 0, "loma": 0 }';
    $timers .= " ]";

    $sql_insert = "INSERT INTO $table (nimi, pvm, " . implode(", ", $tyokohteet) . ", poissa, sairas, loma, timers) VALUES (?, ?, " . str_repeat( "0, ", count($tyokohteet) + 3 ) . "?)";
    $conn -> prepare($sql_insert) -> execute([$name, $date, $timers]);

    $result = $conn -> prepare($sql);
    $result -> execute([$name, $date]);
    $result = $result -> fetch();

  }

  $timers = $result["timers"];

  return($timers);

}

function saveTimers($name, $date, $timers) {

  global $server, $db, $user, $pwd, $table;

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "UPDATE $table SET timers = ? WHERE nimi = ? AND pvm = ?";

  $conn -> prepare($sql) -> execute([$timers, $name, $date]);

}

function deleteEntry($name, $date) {

  global $server, $db, $user, $pwd, $table;

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "DELETE FROM $table WHERE nimi = ? AND pvm = ?";

  $conn -> prepare($sql) -> execute([$name, $date]);

}

function updateData($name, $date, $times, $poissa, $sairas, $loma, $timers) {

  global $server, $db, $user, $pwd, $table, $tyokohteet;

  $name = str_replace("_", " ", $name);
  $name = str_replace("replacethis", "ä", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "SELECT * FROM $table WHERE nimi = ? AND pvm = ?";

  $result = $conn -> prepare($sql);
  $result -> execute([$name, $date]);
  $result = $result -> fetch();

  if ( empty($result) ) {

    $sql_insert = "INSERT INTO $table (nimi, pvm, " . implode(", ", $tyokohteet) . ", poissa, sairas, loma, timers) VALUES (?, ?, " . str_repeat( "0, ", count($tyokohteet) + 3 ) . "?)";
    $conn -> prepare($sql_insert) -> execute([$name, $date, $timers]);

  }

  $sql = "UPDATE $table SET ";

  for ( $i = 0; $i < count($tyokohteet); $i++ ) {
    $sql .= $tyokohteet[$i] . " = " . strval($times[$i])  . ", ";
  }

  $sql .= "poissa = $poissa, sairas = $sairas, loma = $loma WHERE nimi = ? AND pvm = ?";

  $conn -> prepare($sql) -> execute([$name, $date]);

  if ( $timers != "" )
    saveTimers($name, $date, $timers);

}

function getStats($name, $day, $month, $year, $salary_period) {

  global $server, $db, $user, $pwd, $table, $tyokohteet;

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql = "SELECT ";

  for ( $i = 0; $i < count($tyokohteet); $i++ ) {
    $sql .= "SUM(" . $tyokohteet[$i] . "), ";
  }

  $sql = rtrim($sql, ", ");

  $sql .= " FROM $table ";

  if ( $salary_period == "" ) {

    if ( $name != '' && $day == '' && $month == '' && $year == '' )
      $sql .= "WHERE nimi = '$name'";
    else if ( $name == '' && $day !== '' && $month == '' && $year == '' )
      $sql .= "WHERE pvm LIKE '$day.%.%'";
    else if ( $name !== '' && $day !== '' && $month == '' && $year == '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '$day.%.%'";
    else if ( $name == '' && $day == '' && $month !== '' && $year == '' )
      $sql .= "WHERE pvm LIKE '%.$month.%'";
    else if ( $name !== '' && $day == '' && $month !== '' && $year == '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '%.$month.%'";
    else if ( $name == '' && $day !== '' && !$month == '' && $year == '' )
      $sql .= "WHERE pvm LIKE '$day.$month.%'";
    else if ( $name !== '' && $day !== '' && $month !== '' && $year == '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '$day.$month.%'";
    else if ( $name == '' && $day == '' && $month == '' && $year !== '' )
      $sql .= "WHERE pvm LIKE '%.%.$year'";
    else if ( $name !== '' && $day == '' && $month == '' && $year !== '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '%.%.$year'";
    else if ( $name == '' && $day !== '' && $month == '' && $year !== '' )
      $sql .= "WHERE pvm LIKE '$day.%.$year'";
    else if ( $name !== '' && !$day == '' && $month == '' && $year !== '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '$day.%.$year'";
    else if ( $name == '' && $day == '' && $month !== '' && $year !== '' )
      $sql .= "WHERE pvm LIKE '%.$month.$year'";
    else if ( $name !== '' && $day == '' && $month !== '' && $year !== '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '%.$month.$year'";
    else if ( $name == '' && $day !== '' && $month !== '' && $year !== '' )
      $sql .= "WHERE pvm LIKE '$day.$month.$year'";
    else if ( $name !== '' && $day !== '' && $month !== '' && $year !== '' )
      $sql .= "WHERE nimi = '$name' AND pvm LIKE '$day.$month.$year'";

  }
  
  if ( $salary_period == 1 ) {

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

    $sql .= "WHERE nimi = '$name'";
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

  return($result);

}

function liukuma($name, $date_start, $date_end) {

  global $server, $db, $user, $pwd, $table, $tyokohteet_tyoaikaaNostattavat;

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql  = "SELECT SUM(" . implode(" + ", $tyokohteet_tyoaikaaNostattavat) . ") AS sum FROM $table ";
  $sql .= "WHERE nimi = ? AND poissa != 1 AND loma != 1 AND ";
  $sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104)";

  $sum = $conn -> prepare($sql);
  $sum -> execute([$name, $date_start, $date_end]);
  $sum = $sum -> fetch();
  $sum = $sum["sum"];
  $sum = ( $sum != "" ) ? $sum : 0;

  $output = array();
  array_push($output, $sum);

  $sql  = "SELECT SUM(poissa) AS poissa FROM $table WHERE nimi = ? AND ";
  $sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
  $sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

  $poissa = $conn -> prepare($sql);
  $poissa -> execute([$name, $date_start, $date_end]);
  $poissa = $poissa -> fetch();
  $poissa = $poissa["poissa"];
  $poissa = ( $poissa != "" ) ? $poissa : 0;

  array_push($output, $poissa);

  $sql  = "SELECT SUM(sairas) AS sairas FROM $table WHERE nimi = ? AND ";
  $sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
  $sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

  $sairas = $conn -> prepare($sql);
  $sairas -> execute([$name, $date_start, $date_end]);
  $sairas = $sairas -> fetch();
  $sairas = $sairas["sairas"];
  $sairas = ( $sairas != "" ) ? $sairas : 0;

  array_push($output, $sairas);

  $sql  = "SELECT SUM(loma) AS loma FROM $table WHERE nimi = ? AND ";
  $sql .= "CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND ";
  $sql .= "DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday')";

  $loma = $conn -> prepare($sql);
  $loma -> execute([$name, $date_start, $date_end]);
  $loma = $loma -> fetch();
  $loma = $loma["loma"];
  $loma = ( $loma != "" ) ? $loma : 0;

  array_push($output, $loma);

  $output = json_encode($output);

  return $output;

}

function liukumat($date_start, $date_end) {

  global $server, $db, $user, $pwd, $table, $tyokohteet_tyoaikaaNostattavat;

  $TBL2_tyokohteet_tyoaikaaNostattavat = preg_filter("/^/", "TBL2.", $tyokohteet_tyoaikaaNostattavat);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

  $sql_sum = "

    SELECT
        TBL1.nimi, COALESCE( SUM(" . implode(" + ", $TBL2_tyokohteet_tyoaikaaNostattavat) . "), 0 ) AS sum
    FROM 
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
    LEFT JOIN	
        ( SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND poissa != 1 AND loma != 1 ) AS TBL2
    ON 
        TBL1.nimi = TBL2.nimi
    GROUP BY 
        TBL1.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi
	 
  ";	

  $sql_poissa = "

    SELECT 
        TBL1.nimi, COALESCE( SUM(TBL2.poissa), 0 ) AS poissa
    FROM 
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
    LEFT JOIN 
        ( SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday') ) AS TBL2
    ON 
        TBL1.nimi = TBL2.nimi
    GROUP BY 
        TBL1.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi

  ";

  $sql_sairas = "
     
    SELECT 
        TBL1.nimi, COALESCE( SUM(TBL2.sairas), 0 ) AS sairas
    FROM 
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
    LEFT JOIN 
        ( SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday') ) AS TBL2
    ON 
        TBL1.nimi = TBL2.nimi
    GROUP BY 
        TBL1.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi

  ";

  $sql_loma = "

    SELECT 
        TBL1.nimi, COALESCE( SUM(TBL2.loma), 0 ) AS loma
    FROM 
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
    LEFT JOIN 
        ( SELECT * FROM $table WHERE CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday') ) AS TBL2
    ON 
        TBL1.nimi = TBL2.nimi
    GROUP BY 
        TBL1.nimi
    ORDER BY 
        REVERSE(SUBSTRING(REVERSE(TBL1.nimi), 0, CHARINDEX(' ', REVERSE(TBL1.nimi)))), TBL1.nimi;
    
  ";

  $sum = $conn -> prepare($sql_sum);
  $sum -> execute([$date_start, $date_end]);
  $sum = $sum -> fetchAll();

  $poissa = $conn -> prepare($sql_poissa);
  $poissa -> execute([$date_start, $date_end]);
  $poissa = $poissa -> fetchAll();

  $sairas = $conn -> prepare($sql_sairas);
  $sairas -> execute([$date_start, $date_end]);
  $sairas = $sairas -> fetchAll();

  $loma = $conn -> prepare($sql_loma);
  $loma -> execute([$date_start, $date_end]);
  $loma = $loma -> fetchAll();

  $output = array();
  $n      = count($sum);

  for ( $i = 0; $i < $n; $i++ ) {

    if ( $sum[$i]["nimi"] == "Mirelle Kangas" ) {

      $sql_sum = "

        SELECT
            SUM( " . implode(" + ", $tyokohteet_tyoaikaaNostattavat) . " ) 
        FROM 
            $table
        WHERE 
            nimi = ? AND 
            CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND
            CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104);

      ";

      $sql_poissa_sairas_loma = "

        SELECT 
            SUM(poissa),
            SUM(sairas),
            SUM(loma)     
        FROM 
            $table
        WHERE 
            nimi = ? AND 
            CONVERT(DATETIME, pvm, 104) >= CONVERT(DATETIME, ?, 104) AND
            CONVERT(DATETIME, pvm, 104) <= CONVERT(DATETIME, ?, 104) AND
            DATENAME(WEEKDAY, CONVERT(DATETIME, pvm, 104)) NOT IN ('Saturday', 'Sunday');    

      ";

      $sum_mirelle = $conn -> prepare($sql_sum);
      $sum_mirelle -> execute(["Mirelle Kangas", "26.4.2021", "5.8.2021"]);
      $sum_mirelle = $sum_mirelle -> fetch();

      $poissa_sairas_loma = $conn -> prepare($sql_poissa_sairas_loma);
      $poissa_sairas_loma -> execute(["Mirelle Kangas", "26.4.2021", "5.8.2021"]);
      $poissa_sairas_loma = $poissa_sairas_loma -> fetchAll();

      $sum_mirelle    = $sum_mirelle[0];
      $poissa_mirelle = $poissa_sairas_loma[0][0];
      $sairas_mirelle = $poissa_sairas_loma[0][1];
      $loma_mirelle   = $poissa_sairas_loma[0][2];

      $sum[$i]["sum"]       -= (int) $sum_mirelle;
      $poissa[$i]["poissa"] -= $poissa_mirelle;
      $sairas[$i]["sairas"] -= $sairas_mirelle;
      $loma[$i]["loma"]     -= $loma_mirelle;

    }

    array_push( $output, array( $sum[$i]["nimi"], $sum[$i]["sum"], $poissa[$i]["poissa"], $sairas[$i]["sairas"], $loma[$i]["loma"] ) );

  }

  $output = json_encode($output);

  return $output;

}

function chart2($name, $day, $month, $year) {

  global $server, $db, $user, $pwd, $table, $tyokohteet_tyoaikaaNostattavat;

  $name = str_replace("_", " ", $name);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

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
  $result -> execute([$name]);
  $result = $result -> fetchAll();

  $output = array();

  foreach ( $result as $row ) {
    $day = explode(".", $row["pvm"])[0];
    $tyoaika = $row["tyoaika"];
    array_push( $output, array( $day => $tyoaika ) );
  }

  $result2 = $conn -> prepare($sql2);
  $result2 -> execute([$name]);
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

  return($output);

}

function report($day, $month, $year, $num_work_days, $holidays, $liukumat) {

  global $server, $db, $user, $pwd, $table, $tyokohteet_tyoaikaaNostattavat, $tuntipalkalliset;

  $TBL2_tyokohteet_tyoaikaaNostattavat = preg_filter("/^/", "TBL2.", $tyokohteet_tyoaikaaNostattavat);

  $holidays = explode(",", $holidays);
  $holidays = preg_filter("/^/", "'", $holidays);
  $holidays = preg_filter("/$/", "'", $holidays);
  $holidays = implode(",", $holidays);

  $conn = new PDO("sqlsrv:Server=$server;Database=$db", $user, $pwd);

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
        ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
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
            ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
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
            ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' ) AS TBL1
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

}

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