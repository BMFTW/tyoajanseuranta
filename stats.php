<?php

session_cache_limiter("nocache");

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
        <meta http-equiv = "Cache-control" content = "no-cache">

        <!-- CSS -->
        <link rel = "stylesheet" href = "style.css">
        <link rel = "stylesheet" href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">

        <!-- JavaScript -->
        <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src = "stats.js?<?php echo filemtime("stats.js"); ?>"></script>
        <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <script src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

        <style>

            .row {
                text-align: center;
            }

			.hidden, #filters, #liukuma, #away_sick_holiday, #cancel_edits_save_edits, #prev_next, #chart2, #report, hr[id="7"], hr[id="8"], hr[id="9"] {
				display: none;
			}

			#filter {
				margin-bottom: 25px; margin-top: 15px;
			}

			#remove_this_day {
				margin-top: 30px;
				margin-bottom: 20px;
			}

			div[id^="tyokohde"], #liukuma_edellinen, #chart2 {
				margin-bottom: 40px;
			}

			#liukumavahennys_lounastauko {
				margin-top: 30px;
				margin-bottom: 30px;
			}

			#chart1 {
				margin-bottom: -25px;
			}

			#cancel_edits_save_edits {
				margin-top: 35px;
				margin-bottom: 35px;
			}

			#return_salary_period_edit, #away_sick_holiday {
				margin-top: 35px; margin-bottom: 35px;
			}

			#remove_this_day, #return_salary_period_edit, #away_sick_holiday {
				white-space: nowrap;
			}

			#return_salary_period_edit {
				margin-left: 15px;
			}

			#prev_next {
				margin-top: 10px; margin-bottom: 25px;
			}

			#report {
				margin-top: 30px;
			}

			hr[id="2"] {
				margin-bottom: 30px;
			}

			hr[id="3"] {
				width: 40%;
				margin-top: 30px;
				margin-bottom: 30px;
			}

			hr[id="4"] {
				margin-top: 30px;
			}

			hr[id="5"] {
				width: 40%;
			}

			hr[id="9"] {
				margin-bottom: 30px;
			}

        </style>

    </head>
    
    <body>

        <!-- Header -->
        <div class = "jumbotron text-center" id = "header">
            <img src = "logo.png">
            <h5>Työajanseurantajärjestelmä</h5>
            <?php echo $_SESSION["user"] . " - " . $_SESSION["date_today"]; ?>
        </div>
    
		<!-- Menu -->
        <div class = "container" id = "menu">

			<hr id = "1">
    
            <!-- Section, name & date -->
            <div class = "row" id = "section_name_date">
                <div class = "col-sm-12">
                    <div>
                        <h3 id = "section"></h3>
                        <h4 id = "user"><?php echo $_SESSION["user"] ?></h4>
                        <h4 id = "date"></h4>
                    </div>
                </div>
            </div>

            <!-- Suodata -->
			<div class = "row" id = "filter" >
				<button type = "button" class = "btn btn-info mx-auto">Suodata</button>
			</div>

            <!-- Edellinen, seuraava -->
            <div class = "row" id = "prev_next">
                <div class = "col-sm-12">
                    <button type = "button" id = "prev" class = "btn btn-danger">Edellinen</button> &nbsp; &nbsp;
                    <button type = "button" id = "next" class = "btn btn-success">Seuraava</button> &nbsp; &nbsp;
                </div>
            </div>

            <hr id = "2">

			<!-- Henkilö & päivä, kuukausi, vuosi-->
            <div id = "filters">

				<!-- Henkilö -->
				<div class = "row">
				
					<div class = "col-md-12 text-center">
						<div class = "form-group">
							<label for = "person">Henkilö</label>
							<select class = "form-control mx-auto" id = "person" style = "width:auto;">
								<option value = "0"> Kaikki </option>
								<option value = "1">        </option>
							</select>
						</div>
					</div>
				
				</div>
				
				<!-- Päivä, kuukausi, vuosi -->
				<div class = "row">
				
					<!-- Päivä -->
					<div class = "col-md-4 text-center">
						<div class = "form-group">
							<label for = "day">Päivä</label>
							<select class = "form-control mx-auto" id = "day" style = "width:auto;">
								<option value = "">   Kaikki </option>
								<option value = "1">  1      </option>
								<option value = "2">  2      </option>
								<option value = "3">  3      </option>
								<option value = "4">  4      </option>
								<option value = "5">  5      </option>
								<option value = "6">  6      </option>
								<option value = "7">  7      </option>
								<option value = "8">  8      </option>
								<option value = "9">  9      </option>
								<option value = "10"> 10     </option>
								<option value = "11"> 11     </option>
								<option value = "12"> 12     </option>
								<option value = "13"> 13     </option>
								<option value = "14"> 14     </option>
								<option value = "15"> 15     </option>
								<option value = "16"> 16     </option>
								<option value = "17"> 17     </option>
								<option value = "18"> 18     </option>
								<option value = "19"> 19     </option>
								<option value = "20"> 20     </option>
								<option value = "21"> 21     </option>
								<option value = "22"> 22     </option>
								<option value = "23"> 23     </option>
								<option value = "24"> 24     </option>
								<option value = "25"> 25     </option>
								<option value = "26"> 26     </option>
								<option value = "27"> 27     </option>
								<option value = "28"> 28     </option>
								<option value = "29"> 29     </option>
								<option value = "30"> 30     </option>
								<option value = "31"> 31     </option>
							</select>
						</div>
					</div>
									
					<!-- Kuukausi -->
					<div class = "col-md-4 text-center">
						<div class = "form-group">
							<label for = "month">Kuukausi</label>
							<select class = "form-control mx-auto" id = "month" style = "width:auto;">
								<option value = "">   Kaikki    </option>
								<option value = "1">  Tammikuu  </option>
								<option value = "2">  Helmikuu  </option>
								<option value = "3">  Maaliskuu </option>
								<option value = "4">  Huhtikuu  </option>
								<option value = "5">  Toukokuu  </option>
								<option value = "6">  Kesäkuu   </option>
								<option value = "7">  Heinäkuu  </option>
								<option value = "8">  Elokuu    </option>
								<option value = "9">  Syyskuu   </option>
								<option value = "10"> Lokakuu   </option>
								<option value = "11"> Marraskuu </option>
								<option value = "12"> Joulukuu  </option>
							</select>
						</div>
					</div>
					
					<!-- Vuosi -->
					<div class = "col-md-4 text-center">
						<div class = "form-group">
							<label for = "year">Vuosi</label>
							<select class = "form-control mx-auto" id = "year" style = "width:auto;">
								<option value = "">     Kaikki </option>
								<option value = "2020"> 2020   </option>
								<option value = "2021"> 2021   </option>
								<option value = "2022"> 2022   </option>
							</select>
						</div>
					</div>
				
				</div>
			
				<!-- Tämä päivä & tyhjennä valinnat -->
				<div class = "row" id = "remove_this_day">

					<div class = "col-md-12">
						<button type = "button" id = "remove" class = "btn btn-danger mx-auto">Tyhjennä valinnat</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type = "button" id = "this_day" class = "btn btn-primary mx-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tämä päivä&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
					</div>

				</div>

				<hr id = "3">

				<!-- Näytä -->
				<div class = "row">

					<div class = "col-md-12">

						<button type = "submit" form = "show_form" id = "show" class = "btn btn-info">Suodata</button>
						
						<form method = "post" id = "show_form" action = "stats.php">

							<input type = "hidden" name = "day"           value = "<?php echo $_POST["day"] ?>">
							<input type = "hidden" name = "month"         value = "<?php echo $_POST["month"] ?>">
							<input type = "hidden" name = "year"          value = "<?php echo $_POST["year"] ?>">
							<input type = "hidden" name = "person"        value = "1">
							<input type = "hidden" name = "edit"          value = "0">
							<input type = "hidden" name = "salary_period" value = "0">
							<input type = "hidden" name = "user2"         value = "0">

						</form>

					</div>

				</div>

				
				
				<hr id = "4">

            </div>
    
        </div>

		<!-- Times -->
        <div class = "container" id = "times">
            
			<!-- Row 1 -->
			<div class = "row">
	
				<!-- Yhteensä & liukumasaldot -->
				<div class = "col-sm-12">

					<!-- Yhteensä -->
					<div id = "sum">
						<h3 class = "task">Töissä</h3>
						<h1 class = "time"></h1>
					</div>

					<!-- Liukumasaldot -->
					<div id = "liukuma">          </div>
					<div id = "liukuma_edellinen"></div>

				</div>
			
			</div>

			<!-- Row 2 -->
			<div class = "row hidden">
	
				<!-- Työkohde 1 -->
				<div class = "col-sm-12">
					<div id = "tyokohde1">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

			</div>

            <!-- Row 3 -->
            <div class = "row">
                
				<!-- Työkohde 2 -->
				<div class = "col-sm-4">
					<div id = "tyokohde2">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>
	
				<!-- Työkohde 3 -->
				<div class = "col-sm-4">
					<div id = "tyokohde3">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

				<!-- Työkohde 4 -->
				<div class = "col-sm-4">
					<div id = "tyokohde4">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

            </div>
    
            <!-- Row 4 -->
            <div class = "row">
    
                <!-- Työkohde 5 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde5">
                        <h3 class = "task"></h3>                    
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 6 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde6">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 7 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde7">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>

            </div>
    
            <!-- Row 5 -->
            <div class = "row">
    
                <!-- Työkohde 8 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde8">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 9 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde9">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 10 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde10">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>

            </div>
            
            <!-- Row 6 -->
            <div class = "row">
    
                <!-- Työkohde 11 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde11">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 12 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde12">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 13 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde13">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
            
            </div>
    
            <!-- Row 7 -->
            <div class = "row">
            
                <!-- Työkohde 14 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde14">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 15 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde15">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 16 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde16">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>

            </div>

            <!-- Row 8 -->
            <div class = "row">
    
                <!-- Työkohde 17 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde17">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
    
                <!-- Työkohde 18 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde18">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
        
				<!-- Työkohde 19 -->
				<div class = "col-sm-4">
					<div id = "tyokohde19">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

            </div>
            
            <!-- Row 9 -->
            <div class = "row">
              
                <!-- Työkohde 20 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde20">
                        <h3 class = "task"></h3>
                  		<h1 class = "time"></h1>
                	</div>
                </div>
        
				<!-- Työkohde 21 -->
				<div class = "col-sm-4">
					<div id = "tyokohde21">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>
                  
				<!-- Työkohde 22 -->
				<div class = "col-sm-4">
					<div id = "tyokohde22">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

            </div>
            
            <!-- Row 10 -->
            <div class = "row">
          
                <!-- Työkohde 23 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde23">
						<h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
          
                <!-- Työkohde 23 -->
                <div class = "col-sm-4">
				    <div id = "tyokohde24">
					    <h3 class = "task"></h3>
					    <h1 class = "time"></h1>
				    </div>
			    </div>
                  
                <!-- Työkohde 25 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde25">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>

            </div>
              
            <!-- Row 11 -->
            <div class = "row">
          
                <!-- Työkohde 26 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde26">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>
          
                <!-- Työkohde 27 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde27">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>
                  
                <!-- Työkohde 28 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde28">
                        <h3 class = "task"></h3>
                        <h1 class = "time"></h1>
                    </div>
                </div>

            </div>
              
            <!-- Row 12 -->
            <div class = "row">
                      
                <!-- Työkohde 29 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde29">
                        <h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

                <!-- Työkohde 30 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde30">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

                <!-- Työkohde 31 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde31">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>
          
            </div>

            <!-- Row 13 -->
            <div class = "row">
                      
                <!-- Työkohde 32 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde32">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

                <!-- Työkohde 33 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde33">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

                <!-- Työkohde 34 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde34">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>
          
            </div>

            <!-- Row 14 -->
            <div class = "row">
                      
                <!-- Työkohde 35 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde35">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

                <!-- Työkohde 36 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde36">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

				<!-- Työkohde 37 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde37">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

            </div>

			<!-- Row 15 -->
            <div class = "row">
                      
                <!-- Työkohde 38 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde38">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

				<!-- Työkohde 39 -->
                <div class = "col-sm-4">
                    <div id = "tyokohde39">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
                    </div>
                </div>

            </div>
				
			<hr id = "5">
		
			<!-- Row 16 -->
			<div class = "row" id = "liukumavahennys_lounastauko">

				<!-- Liukumavähennys -->
				<div class = "col-sm-6">
					<div id = "liukumavahennys">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>

				<!-- Lounastauko -->
				<div class = "col-sm-6">
					<div id = "lounastauko">
						<h3 class = "task"></h3>
						<h1 class = "time"></h1>
					</div>
				</div>
				
			</div>

			<hr id = "6">

		</div>

		<!-- Bar charts -->
		<div class = "container" id = "charts">

			<div class = "row justify-content-center">
				<div class = "col-md-12">
					<canvas id = "chart1"></canvas>
					<canvas id = "chart2"></canvas>
				</div>
			</div>
		
		</div>

		<!-- Counts -->
		<div class = "container" id = "counts">

			<div class = "row" id = "away_sick_holiday_counts">

				<!-- Aways -->
				<div class = "col-sm-4">
					<div id = "aways">
						<h3></h3>
						<h1></h1>
					</div>
				</div>

				<!-- Sicks -->
				<div class = "col-sm-4">
					<div id = "sicks">
						<h3></h3>
						<h1></h1>
					</div>
				</div>

				<!-- Holidays -->
				<div class = "col-sm-4">
					<div id = "holidays">
						<h3></h3>
						<h1></h1>
					</div>
				</div>

			</div>

			<hr id = "7">

		</div>
         
		<!-- Buttons -->
		<div class = "container" id = "buttons">

			<!-- Poissa, sairas, loma -->
			<div class = "row" id = "away_sick_holiday">
				<div class = "col-md-12">
					<button type = "button" id = "away"    class = "btn btn-danger">Poissa</button> &nbsp;&nbsp;&nbsp;
					<button type = "button" id = "sick"    class = "btn btn-primary">Sairas</button> &nbsp;&nbsp;&nbsp;
					<button type = "button" id = "holiday" class = "btn btn-warning">Loma</button>
				</div>
			</div>

			<hr id = "8">
	
			<!-- Lataa kaikkien työntekijöiden tunnit .xlsx-muodossa -->
			<div class = "row" id = "report">
				<div class = "col-sm-12">
					<button type = "button" class = "btn btn-success">Lataa kaikkien työntekijöiden tunnit .xlsx-muodossa</button>
				</div>
			</div>

			<hr id = "9">

			<!-- Palaa, palkanmaksujakso, muokkaa -->
			<div class = "row" id = "return_salary_period_edit">

				<div class = "col-md-12">

					<!-- Palaa -->
					<button type = "submit" form = "return_form" id = "return" class = "btn btn-danger">Palaa</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

					<!-- Palkanmaksujakso -->
					<button type = "submit" form = "salary_period_form" id = "salary_period" class = "btn btn-info">Palkanmaksujakso</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

					<!-- Muokkaa -->
					<button type = "submit" form = "edit_form" id = "edit" class = "btn btn-success">Muokkaa</button>

					<form method = "post" id = "return_form" action = "stats.php">

						<input type = "hidden" name = "day"           value = "">
						<input type = "hidden" name = "month"         value = "">
						<input type = "hidden" name = "year"          value = "">
						<input type = "hidden" name = "person"        value = "">
						<input type = "hidden" name = "edit"          value = "">
						<input type = "hidden" name = "salary_period" value = "">
						<input type = "hidden" name = "user2"         value = "">

					</form>

					<form method = "post" id = "salary_period_form" action = "stats.php">

						<input type = "hidden" name = "day"           value = "">
						<input type = "hidden" name = "month"         value = "">
						<input type = "hidden" name = "year"          value = "">
						<input type = "hidden" name = "person"        value = "">
						<input type = "hidden" name = "edit"          value = "">
						<input type = "hidden" name = "salary_period" value = "">
						<input type = "hidden" name = "user2"         value = "">

					</form>


					<form method = "post" id = "edit_form" action = "stats.php">

						<input type = "hidden" name = "day"           value = "<?php echo $_POST["day"] ?>">
						<input type = "hidden" name = "month"         value = "<?php echo $_POST["month"] ?>">
						<input type = "hidden" name = "year"          value = "<?php echo $_POST["year"] ?>">
						<input type = "hidden" name = "person"        value = "1">
						<input type = "hidden" name = "edit"          value = "1">
						<input type = "hidden" name = "salary_period" value = "0">
						<input type = "hidden" name = "user2"         value = "0">

					</form>

				</div>

			</div>

			<!-- Peruuta, tallenna -->
			<div class = "row" id = "cancel_edits_save_edits">

				<!-- Peruuta -->
				<button type = "submit" form = "cancel_edits_form" id = "cancel_edits" class = "btn btn-danger">Peruuta</button> &nbsp;&nbsp;&nbsp;

				<!-- Tallenna -->
				<button type = "submit" form = "save_edits_form" id = "save_edits" class = "btn btn-success">Tallenna</button>

				<form method = "post" id = "cancel_edits_form" action = "stats.php">

					<input type = "hidden" name = "day"           value = "">
					<input type = "hidden" name = "month"         value = "">
					<input type = "hidden" name = "year"          value = "">
					<input type = "hidden" name = "person"        value = "">
					<input type = "hidden" name = "edit"          value = "">
					<input type = "hidden" name = "salary_period" value = "">
					<input type = "hidden" name = "user2"         value = "">

				</form>

				<form method = "post" id = "save_edits_form" action = "stats.php">

					<input type = "hidden" name = "day"           value = "<?php echo $_POST["day"] ?>">
					<input type = "hidden" name = "month"         value = "<?php echo $_POST["month"] ?>">
					<input type = "hidden" name = "year"          value = "<?php echo $_POST["year"] ?>">
					<input type = "hidden" name = "person"        value = "1">
					<input type = "hidden" name = "edit"          value = "">
					<input type = "hidden" name = "salary_period" value = "">
					<input type = "hidden" name = "user2"         value = "">

				</form>		

			</div>

		<!-- Hidden data -->
		<div class = "container hidden" id = "data">

			<div class = "row">
				<div class = "col-md-12">
					<p id = "times_data">   </p>
					<p id = "update_data">  </p>
					<p id = "liukumat_data"></p>
					<p id = "report_data">  </p>
					<p id = "chart2_data">  </p>
				</div>
			</div>

			<div class = "row">
				<input name = "day"           value = "<?php echo $_POST["day"] ?? date('j') ?>"           >
				<input name = "month"         value = "<?php echo $_POST["month"] ?? date('n') ?>"         >
				<input name = "year"          value = "<?php echo $_POST["year"] ?? date('Y') ?>"          >
				<input name = "person"        value = "<?php echo $_POST["person"] ?? '1' ?>"        >
				<input name = "edit"          value = "<?php echo $_POST["edit"] ?? '0' ?>"          >
				<input name = "salary_period" value = "<?php echo $_POST["salary_period"] ?? '0' ?>" >
				<input name = "user2"         value = "<?php echo $_POST["user2"] ?? '0' ?>"         >
			</div>

		</div>



		<script src = "vars_funs.js?<?php echo filemtime("vars_funs.js"); ?>"></script>
        
    </body>

</html>	