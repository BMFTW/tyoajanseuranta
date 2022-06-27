<?php

include("config.php");

$date_start = $_REQUEST["date_start"];
$date_end   = $_REQUEST["date_end"];

$sql_sum = "

SELECT
    TBL1.nimi, COALESCE( SUM(" . implode(" + ", $TBL2_tyokohteet_tyoaikaaNostattavat) . "), 0 ) AS sum
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

$sql_poissa = "

SELECT 
    TBL1.nimi, COALESCE( SUM(TBL2.poissa), 0 ) AS poissa
FROM 
    ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
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
    ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
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
    ( SELECT DISTINCT nimi FROM $table WHERE nimi != 'Oskari Riihimäki' AND nimi != 'Heli Rokkonen' ) AS TBL1
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

echo $output;
  
?>