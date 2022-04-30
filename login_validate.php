<?php

include("config.php");

$user = $_REQUEST["user"];
$pwd  = $_REQUEST["pwd"];

$sql  = "SELECT COUNT(*) FROM tyoajanseuranta_admin WHERE username = ? AND pwd = ?";
$stmt = $conn -> prepare($sql);
$stmt -> execute([$user, $pwd]);
$count = $stmt -> fetch();
$count = $count[0];

if ( $count == "1" ) {

    $user = str_replace("@awanic.fi", "", $user);
    $user = str_replace(".", " ", $user);
    $user = str_replace("makinen", "mäkinen", $user);
    $user = str_replace("paivi", "päivi", $user);
    $user = str_replace("riihimaki", "riihimäki", $user);
    $user = ucwords($user);

    $_SESSION["user"] = $user;

    echo "<script>location.href='main.php'</script>";

} else {

    echo "<script>$('#login').removeClass('btn-success').addClass('btn-danger');</script>";

}

?>