<?php

// Session timeout
ini_set("session.gc_maxlifetime", 43200);

// Start Session
session_start();

if ( !isset( $_SESSION["user"] ) ) {
  header("Location: login.php");
}

?>

<!DOCTYPE html>

<html lang = "en">
  
    <head>
  
  		<!-- Title -->
  		<title>Työajanseuranta</title>
  
  		<!-- Meta -->
    	<meta charset = "utf-8">
  		<meta name = "viewport" content = "width = device-width, initial-scale = 1">
  
  		<!-- CSS -->
  		<link rel = "stylesheet" href = "style.css">
  		<link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  
  		<!-- JavaScript -->
  		<script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  		
  		<script src = "main.js?<?php echo filemtime("main.js"); ?>"></script>
    	<script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  		<script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  
  		<style>
  
            .group1, .group2 {
  				margin-top: 50px;
  				text-align: center;
  			}
  
  			.toissa {
  				margin-top: 2px !important;
  				min-width: 350px;
  			}

			.toissa .time {
  				margin-left: 10px;
				float: right;
  			}

			#fiilismittari_report {
				margin-top: -10px;
				margin-bottom: 25px;
				display: none;
			}

			#logout_stats_save {
				white-space: nowrap;
			}
  
  			.hidden {
  				display: none;
  			}
  
  		</style> 
  
    </head>

    <body>

    	<!-- Jumbotron -->
    	<div class = "jumbotron text-center">
    		<img src = "logo.png">
			<h5>Työajanseurantajärjestelmä</h5>
			<?php echo $_SESSION["user"] . " - " . date("j.n.Y"); ?>
    	</div>
  
  		<!-- Body -->
    	<div class = "container">
          		
			<!-- Töissä, lounastauko, poissa -->
			<div class = "row group1">
	
				<!-- Töissä -->
				<div class = "col-md-4 col-sm-6 col-xs-6">
	
					<div class = "btn-group">
	
						<!-- #displayed1, #arrow1 -->
						<button type = "button" id = "displayed1" class = "btn btn-success btn-block">Töissä &nbsp;&nbsp;&nbsp; 00:00:00</button>
						<button type = "button" id = "arrow1"     class = "btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle = "dropdown" data-flip = "false"></button>
					
						<!-- Dropdown menu -->
						<div class = "dropdown-menu toissa center">
	
							<a class = "dropdown-item"     data-name = "Yhteensä" id = "sum"> Töissä <span class = "time"></span> </a>
							<a class = "dropdown-item"     data-name = "Töissä">              Töissä <span class = "time"></span> </a>

							<div class = "dropdown-divider"></div>
							
							<h5 class = "dropdown-header">Tietojärjestelmät</h5>
							<a class = "dropdown-item" data-name = "Tietojärjestelmät - Kehitys"> Kehitys <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Tietojärjestelmät - Tuki">    Tuki    <span class = "time"></span> </a>
	
							<div class = "dropdown-divider"></div>
	
							<h5 class = "dropdown-header">LOVe</h5>
							<a class = "dropdown-item" data-name = "LOVe - Ylläpito">         Ylläpito         <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "LOVe - Tuki">             Tuki             <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "LOVe - Sisällöntuotanto"> Sisällöntuotanto <span class = "time"></span> </a>
	
							<div class = "dropdown-divider"></div>
	
							<h5 class = "dropdown-header">Muut verkkokurssit</h5>
							<a class = "dropdown-item" data-name = "Muut verkkokurssit - Ylläpito">         Ylläpito         <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Muut verkkokurssit - Tuki">             Tuki             <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Muut verkkokurssit - Sisällöntuotanto"> Sisällöntuotanto <span class = "time"></span> </a>
	
							<div class = "dropdown-divider"></div>
	
							<h5 class = "dropdown-header">Muut tuotteet</h5>
							<a class = "dropdown-item" data-name = "Muut tuotteet - Kehitys"> Kehitys <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Muut tuotteet - Tuki">    Tuki    <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "eLOKI">                   eLOKI   <span class = "time"></span> </a>
	
							<div class = "dropdown-divider"></div>
	
							<h5 class = "dropdown-header">Muut</h5>
							<a class = "dropdown-item" data-name = "Yhteiset työkalut">       Yhteiset työkalut       <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Testaus">                 Testaus                 <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Nettisivut">              Nettisivut              <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Verkkoinfrastruktuuri">   Verkkoinfrastruktuuri   <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Microsoft 365">           Microsoft 365           <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Ruotsinnos">              Ruotsinnos              <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "LAS-ruotsinnos">          LAS-ruotsinnos          <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "GER-ruotsinnos">          GER-ruotsinnos          <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "NÄYTTÖ">                  NÄYTTÖ                  <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "PSYK">                    PSYK                    <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "SYTO">                    SYTO                    <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Sopimukset & tarjoukset"> Sopimukset & tarjoukset <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Sisäinen viestintä">      Sisäinen viestintä      <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Sisäiset palaverit">      Sisäiset palaverit      <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Asiakasviestintä">        Asiakasviestintä        <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Asiakaspalaverit">        Asiakaspalaverit        <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Koulutukset">             Koulutukset             <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Koulutusten valmistelu">  Koulutusten valmistelu  <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Taloushallinto">          Taloushallinto          <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Hallinnointipalvelut">    Hallinnointipalvelut    <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Henkilöstöhallinto">      Henkilöstöhallinto      <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Laatutyö">                Laatutyö                <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Laskutettava tuntityö">   Laskutettava tuntityö   <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Työmatkat">               Työmatkat               <span class = "time"></span> </a>
	
							<div class = "dropdown-divider"></div>
							
							<h5 class = "dropdown-header">Poissa</h5>
							<a class = "dropdown-item" data-name = "Happihyppely">                           Happihyppely, 15 min  <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Palkallinen poissaolo">                  Palkallinen poissaolo <span class = "time"></span> </a>
							<a class = "dropdown-item" data-name = "Liukumavähennys" id = "liukumavahennys"> Liukumavähennys       <span class = "time"></span> </a>
	
						</div>
	
					</div>
	
				</div>
	
				<br><br><br>
	
				<!-- Lounastauko -->
				<div class = "col-md-4 col-sm-5 col-xs-5">
	
					<div class = "btn-group">
						<button type = "button" class = "btn btn-warning lounastauko" data-name = "Lounastauko"> Lounastauko &nbsp; <span class = "time"></span> </button>
					</div>
	
				</div>
				
				<br><br><br>
	
				<!-- Poissa -->
				<div class = "col-md-4 col-sm-1 col-xs-1">
	
					<div class = "btn-group">
	
						<button type = "button" id = "displayed2" class = "btn btn-danger">Poissa</button>
						<button type = "button" id = "arrow2"     class = "btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle = "dropdown"></button>
					
						<div class = "dropdown-menu poissa">
							<a class = "dropdown-item" data-name = "Poissa"> Poissa (koko päivä, palkaton) <span><abbr title="Palkallinen poissaolo ja liukumavähennys löytyvät Töissä-valikosta">?</abbr></span> </a>
							<a class = "dropdown-item" data-name = "Sairas"> Sairas </a>
							<a class = "dropdown-item" data-name = "Loma">   Loma   </a>
						</div>
	
				</div>
	
				</div>
	
				<br><br><br>
	
			</div>
	
			<!-- --- -->
			<hr style = "width:40%">

			<!-- Fiilismittari -->
			<div class = "row" id = "fiilismittari">
				<div class = "col-sm-12 text-center">
					<iframe src = "https://www.awanic.fi/haipro/200/qpro/julkinen/kysely.asp?kohdeID=200&julkaisuID=1&avain=a3p6h8b9v7" title = "Fiilismittari"></iframe>
				</div>
			</div>

			<!-- Raportti -->
			<div class = "row" id = "fiilismittari_report">
				<div class = "col-sm-12 text-center">
					<a href = "https://www.awanic.fi/haipro/200/qpro/raportti.asp?kohdeID=200&julkaisuID=1" target = "_blank">Raportti</a>
				</div>
			</div>

			<!-- --- -->
			<hr style = "width:40%">
	
			<!-- Kirjaudu ulos, tilastot, tallenna -->
			<div class = "row group2" id = "logout_stats_save">

				<div class = "col-md-12">
					<button type = "button" id = "logout" class = "btn btn-danger"> Kirjaudu ulos </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button type = "submit" form = "stats_form" id = "stats" class = "btn btn-dark">Tilastot</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button type = "submit" form = "save_form" id = "save" class = "btn btn-success">Tallenna</button>
				</div>

				<form method = "post" id = "stats_form" action = "stats.php">

					<input type = "hidden" name = "day"           value = "<?php echo date('j'); ?>">
					<input type = "hidden" name = "month"         value = "<?php echo date('n'); ?>">
					<input type = "hidden" name = "year"          value = "<?php echo date('Y'); ?>">
					<input type = "hidden" name = "person"        value = "1">
					<input type = "hidden" name = "edit"          value = "0">
					<input type = "hidden" name = "salary_period" value = "0">
					<input type = "hidden" name = "user2"         value = "0">

				</form>

				<form method = "post" id = "save_form" action = "stats.php">

					<input type = "hidden" name = "day"           value = "<?php echo date('j'); ?>">
					<input type = "hidden" name = "month"         value = "<?php echo date('n'); ?>">
					<input type = "hidden" name = "year"          value = "<?php echo date('Y'); ?>">
					<input type = "hidden" name = "person"        value = "1">
					<input type = "hidden" name = "edit"          value = "0">
					<input type = "hidden" name = "salary_period" value = "0">
					<input type = "hidden" name = "user2"         value = "0">

				</form>

			</div>
	
			<!-- Hidden data -->
			<div class = "row hidden">

				<div class = "col-sm-12">
					<p id = "initialize">  </p>
					<p id = "user"><?php echo $_SESSION["user"]?></p>
					<p id = "get_timers">  </p>
					<p id = "save_timers"> </p>
					<p id = "logout_php">  </p>
					<p id = "update_data"> </p>
				</div>

				<script src = "vars_funs.js?<?php echo filemtime("vars_funs.js"); ?>"></script>

			</div>
  		     
  		</div>
  
    </body>

</html>