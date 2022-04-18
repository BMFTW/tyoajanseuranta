<?php

session_start();

$user = $_REQUEST["user"];
$pwd  = $_REQUEST["pwd"];

if ( 

    ( $user == "roope.anttila@awanic.fi"     && $pwd == "1629" ) ||
    ( $user == "valtteri.anttila@awanic.fi"  && $pwd == "9200" ) ||     
    ( $user == "heli.haavisto@awanic.fi"     && $pwd == "4710" ) ||
    ( $user == "elina.hanslian@awanic.fi"    && $pwd == "6285" ) ||
    ( $user == "mirelle.kangas@awanic.fi"    && $pwd == "4866" ) ||
    ( $user == "otto.kontio@awanic.fi"       && $pwd == "6632" ) ||
    ( $user == "simo.korpela@awanic.fi"      && $pwd == "2544" ) ||
    ( $user == "eeli.kuosmanen@awanic.fi"    && $pwd == "7029" ) ||
    ( $user == "tuukka.monto@awanic.fi"      && $pwd == "6448" ) ||
    ( $user == "elisa.makinen@awanic.fi"     && $pwd == "9043" ) ||
    ( $user == "riikka.panu@awanic.fi"       && $pwd == "0311" ) ||
    ( $user == "oskari.riihimaki@awanic.fi"  && $pwd == "2235" ) ||
    ( $user == "heli.rokkonen@awanic.fi"     && $pwd == "9751" ) ||
    ( $user == "emma.ruotsalainen@awanic.fi" && $pwd == "2502" ) ||
    ( $user == "jaakko.saano@awanic.fi"      && $pwd == "7981" ) ||
    ( $user == "kaisa.saano@awanic.fi"       && $pwd == "3656" ) ||
    ( $user == "jarkko.wallenius@awanic.fi"  && $pwd == "7713" )
    
) {

    $user = str_replace("@awanic.fi", "", $user);
    $user = str_replace(".", " ", $user);
    $user = str_replace("makinen", "mäkinen", $user);
    $user = str_replace("riihimaki", "riihimäki", $user);
    $user = ucwords($user);

    $_SESSION["user"]       = $user;
    $_SESSION["date_today"] = date("j.n.Y");

    echo "<script>location.href='main.php'</script>";

} else {

    echo "<script>$('#login').removeClass('btn-success').addClass('btn-danger');</script>";

}

?>