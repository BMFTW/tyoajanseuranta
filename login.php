<?php

session_start();

if ( isset( $_SESSION["user"] ) ) {
  header("Location: main.php");
}

?>

<!DOCTYPE html>

<html>

  <head>

    <!-- Title -->
    <title>Kirjaudu sisään</title>

    <!-- Meta -->
    <meta charset = "utf-8">
    <meta name = "viewport" content = "width = device-width, initial-scale = 1">

    <!-- CSS -->
    <link rel = "stylesheet" href = "style.css">
    <link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

    <!-- JavaScript -->
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src = "vars_funs.js?<?php echo filemtime("vars_funs.js"); ?>"></script>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    
  </head>
  
  <body>
  
    <!-- Header -->
    <div class = "jumbotron text-center" style = "padding-bottom: 20px;">
      <img src = "logo.png">
      <h5>Työajanseurantajärjestelmä</h5>
      <p><?php echo date("j.n.Y"); ?></p>
    </div>
  
    <!-- Login -->
    <div class = "container">
      <div class = "col-sm-4" style = "margin: 0 auto;">
        <h2>Kirjaudu sisään</h2>
          <label for = "email">Käyttäjätunnus:</label>
          <input class = "form-control" id = "email" placeholder = "Anna käyttäjätunnus"> <br>
          <label for = "pwd">Salasana:</label>
          <input class = "form-control" id = "pwd" placeholder = "Anna salasana" autocomplete = "off"> <br>
          <button id = "login" class = "btn btn-success ">Kirjaudu</button>
      </div> 
    </div>

    <p id = "login_validate"></p>

    <script>

      $(document).ready( function () {

        $("#login").click( function () {

          var user = $("#email").val();
          var pwd  = $("#pwd").val();

          // Validate login
          $("#login_validate").load("login_validate.php?user=" + user + "&pwd=" + pwd);
        
        });  

      });

    </script>
  
  </body>

</html>