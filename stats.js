$.getScript("vars_funs.js", function() {
  
  $(document).ready( function() {

    // -------------------------------------------------------------------------------------

    if ( !userIDs.includes(userID) )  {
      window.location.href = "login.html";
      return false;
    }

    // -------------------------------------------------------------------------------------

    var day_copy = day;

    // -------------------------------------------------------------------------------------

    // #name
    person !== "" ? $("#name").text(user) : $("#name").text("Kaikki työntekijät");
    
    // #date
    var months = { 
      1:  "Tammikuu",
      2:  "Helmikuu",
      3:  "Maaliskuu",
      4:  "Huhtikuu",
      5:  "Toukokuu",
      6:  "Kesäkuu",
      7:  "Heinäkuu",
      8:  "Elokuu",
      9:  "Syyskuu",
      10: "Lokakuu",
      11: "Marraskuu",
      12: "Joulukuu"
    };
    
    if ( day !== "" && month !== "" && year !== "" )
      $("#date").text(day + ". " + months[month].toLowerCase() + "ta " + year);
    else if ( day == "" && month !== "" && year !== "" )
      $("#date").text(months[month] + " " + year);
    else if ( day !== "" && month == "" && year !== "" )
      $("#date").text(day + ". päivä " + year);
    else if ( day !== "" && month !== "" && year == "" )
      $("#date").text(day + ". " + months[month].toLowerCase() + "ta ");
    else if ( day !== "" && month == "" && year == "" )
      $("#date").text(day + ". päivä");
    else if ( day == "" && month == "" && year !== "" )
      $("#date").text(year);
    else if ( day == "" && month !== "" && year == "" )
      $("#date").text(months[month]);
    else if ( day == "" && month == "" && year == "" )
      $("#date").text("Yhteensä");

    // -------------------------------------------------------------------------------------

    $("#person").find("option[value='1']").text(user);
    person != "" ? $("#person").val("1") : $("#person").val("");
    
    $("#day").val(day);
    $("#month").val(month);
    $("#year").val(year);

    // -------------------------------------------------------------------------------------

    if ( user == "Riikka Panu" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Mirelle Kangas",    "1776090" ) );
      $("#person").append( new Option( "Otto Kontio",       "2420680" ) );
      $("#person").append( new Option( "Simo Korpela",      "928560"  ) );
      $("#person").append( new Option( "Elisa Mäkinen",     "3300695" ) );
      $("#person").append( new Option( "Oskari Riihimäki",  "815775"  ) );
      $("#person").append( new Option( "Emma Ruotsalainen", "913230"  ) );
      
    }

    if ( user == "Heli Rokkonen" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Roope Anttila",    "594585"  ) );
      $("#person").append( new Option( "Valtteri Anttila", "3358000" ) );
      $("#person").append( new Option( "Heli Haavisto",    "1719150" ) );
      $("#person").append( new Option( "Elina Hanslian",   "2294025" ) );
      $("#person").append( new Option( "Tuukka Monto",     "2353520" ) );
      $("#person").append( new Option( "Jaakko Saano",     "2913065" ) );
      
    }

    if ( user == "Jarkko Wallenius" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Roope Anttila",     "594585"  ) );
      $("#person").append( new Option( "Valtteri Anttila",  "3358000" ) );
      $("#person").append( new Option( "Heli Haavisto",     "1719150" ) );
      $("#person").append( new Option( "Elina Hanslian",    "2294025" ) );
      $("#person").append( new Option( "Mirelle Kangas",    "1776090" ) );
      $("#person").append( new Option( "Otto Kontio",       "2420680" ) );
      $("#person").append( new Option( "Simo Korpela",      "928560"  ) );
      $("#person").append( new Option( "Tuukka Monto",      "2353520" ) );
      $("#person").append( new Option( "Elisa Mäkinen",     "3300695" ) );
      $("#person").append( new Option( "Riikka Panu",       "113515"  ) );
      $("#person").append( new Option( "Oskari Riihimäki",  "815775"  ) );
      $("#person").append( new Option( "Heli Rokkonen",     "3559115" ) );
      $("#person").append( new Option( "Emma Ruotsalainen", "913230"  ) );
      $("#person").append( new Option( "Jaakko Saano",      "2913065" ) );
      
    }

    // -------------------------------------------------------------------------------------

    // Näytä kohteet
    // user / user2?
    if ( user2 == "" ) {

      if ( person == "1" ) {
        naytaKaikkienKohteet_stats();
      } else {
        naytaKohteet_stats(kaikki_kohteet_stats);
        user_ = "";
      }

    }
    
    else {

      user  = user2;
      user_ = user2_;

      naytaKaikkienKohteet_stats();

      $("#name").text(user2);
      $("#person option:contains(" + user2 + ")").prop("selected", true);

      if ( tuntityontekija(user2) ) {

        // Liukumavähennys & lounastauko
        $("#liukumavahennys").parent().css("display", "none");
        $("#lounastauko").parent().removeClass("col-sm-6").addClass("col-sm-12");

      }

    }

    // -------------------------------------------------------------------------------------

    // Get stats
    $("#times_data").load("get_stats.php?name=" + user_ + "&day=" + day + "&month=" + month + "&year=" + year + "&salary_period=" + salary_period, function () {
     
      var times = $(this).text();
      
      times = JSON.parse(times);
        
      var poissa = times["poissa"] !== null ? times["poissa"] : 0;
      var sairas = times["sairas"] !== null ? times["sairas"] : 0;
      var loma   = times["loma"]   !== null ? times["loma"]   : 0;

      // Poissaolo / sairauspoissaolo / loma
      if ( ( poissa == 1 || sairas == 1 || loma == 1 ) && ( day != "" && month != "" && year != "" ) && ( edit == "" && salary_period == "" ) ) {
       
        var txt;

        if ( poissa == 1 )
          txt = "Poissaolo";
        else if ( sairas == 1 )
          txt = "Sairauspoissaolo";
        else if ( loma == 1 )
          txt = "Loma";
        
        $("#times, #charts, #counts").hide();

        $("#times").after("<h1 id = 'txt' style = 'text-align: center'>" + txt + "</h1>");

        $("#txt").css("margin-top", "50px").css("margin-bottom", "50px");

        return false;
        
      }

      if ( edit == 1 ) {

        if ( poissa == 1 )
          $("#away").click();
        else if ( sairas == 1 )
          $("#sick").click();
        else if ( loma == 1 )
          $("#holiday").click();

      }

      if ( salary_period == 1 ) {

        $("#aways").find("h3").text("Poissaolot");
        $("#aways").find("h1").text(poissa);
        $("#aways").find("h1").css("color", "red");

        $("#sicks").find("h3").text("Sairauspoissaolot");
        $("#sicks").find("h1").text(sairas);
        $("#sicks").find("h1").css("color", "blue");

        $("#holidays").find("h3").text("Lomapäivät");
        $("#holidays").find("h1").text(loma);
        $("#holidays").find("h1").css("color", yellow);

      }

      // -------------------------------------------------------------------------------------
  
      // Get times
      var tyokohde;
      var time;
      var sum = 0;
  
      $(".time").each( function() {

        if ( $(this).parent().prop("id") == "sum" || $(this).parent().css("display") == "none" )
          return true;

        tyokohde = $(this).prev(".task").text();
        tyokohde = tyokohde.replace("Tietojärjestelmät", "TJ");
        tyokohde = tyokohde.toLowerCase().replace(/<br>/g, "").replace(/ä/g, "a").replace(/ö/g, "o").replace(/\W+/g, "_");

        time = times[tyokohde];
        time = s_to_hms(time);
        $(this).text(time);

        time != "00:00:00" ? $(this).css("color", "green") : $(this).css("color", "red");

        sum += hms_to_s(time);

      });

      // -------------------------------------------------------------------------------------
  
      // Sum
      sum -= times["liukumavahennys"];
      sum -= times["lounastauko"];
      sum = s_to_hms(sum);

      var $sum = $("#sum").find(".time");

      $sum.text(sum);

      sum != "00:00:00" ? $sum.css("color", "green") : $sum.css("color", "red");

      // -------------------------------------------------------------------------------------

      // Liukuma
      if ( kuukausipalkallinen(user) && person != "" && edit != 1 && ( salary_period != 1 || ( salary_period == 1 && ( month == month_today && year == year_today ) ) ) ) {

        var date_start = "26.4.2021";

        if ( user == "Elisa Mäkinen" ) {
          date_start = "11.5.2021";
        } 
        
        if ( user == "Mirelle Kangas" ) {
          date_start = "6.8.2021";
        }

        var date_end = day + "." + month + "." + year;

        $("#liukuma").load("liukuma.php?name=" + user_ + "&date_start=" + date_start + "&date_end=" + date_end, function() {

          var input = $(this).text();
          
          input = JSON.parse(input);

          var sum               = parseInt(input[0]);
          var poissaolot        = parseInt(input[1]);
          var sairauspoissaolot = parseInt(input[2]);
          var lomapaivat        = parseInt(input[3]);

          num_days  = getDates(date_start, date_end).filter( day => !isWeekend(day) && !isHoliday(day) ).length;
          num_days -= poissaolot;
          num_days -= sairauspoissaolot;
          num_days -= lomapaivat;

          var balance;
          
          if ( user == "Heli Rokkonen" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("41:15:00");
          else if ( user == "Valtteri Anttila" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("09:41:30");
          else
            balance = 0;

          var hours = 7.5;
          if ( user == "Heli Haavisto" )
            hours = 7;
        
          var liukuma = sum + balance - num_days * hours * 3600;
          var sign    = liukuma >= 0 ? "+" : "-";
          var color   = liukuma >= 0 ? "green" : "red";

          liukuma = Math.abs(liukuma);

          $("#liukuma")
            .show()
            .html("Liukumasaldo: <span>" + sign + s_to_hms(liukuma) + "</span>")
            .find("span").css("color", color);

        })

        // Edellisen päivän jälkeen
        var date_yesterday = asDate(date_end);
        date_yesterday.setDate( date_yesterday.getDate() - 1 );
        date_yesterday = date_yesterday.getDate() + "." + ( date_yesterday.getMonth() + 1 ) + "." + date_yesterday.getFullYear();

        $("#liukuma_edellinen").load("liukuma.php?name=" + user_ + "&date_start=" + date_start + "&date_end=" + date_yesterday, function() {

          var input = $(this).text();
          
          input = JSON.parse(input);

          var sum               = parseInt(input[0]);
          var poissaolot        = parseInt(input[1]);
          var sairauspoissaolot = parseInt(input[2]);
          var lomapaivat        = parseInt(input[3]);

          num_days  = getDates(date_start, date_yesterday).filter( day => !isWeekend(day) && !isHoliday(day) ).length;
          num_days -= poissaolot;
          num_days -= sairauspoissaolot;
          num_days -= lomapaivat;
      
          var balance;

          if ( user == "Heli Rokkonen" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("41:15:00");
          else if ( user == "Valtteri Anttila" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("09:41:30");
          else
            balance = 0;

          var hours = 7.5;
          if ( user == "Heli Haavisto" )
            hours = 7;
        
          var liukuma = sum + balance - num_days * hours * 3600;
          var sign    = liukuma >= 0 ? "+" : "-";
          var color   = liukuma >= 0 ? "green" : "red";

          liukuma = Math.abs(liukuma);

          $("#liukuma_edellinen")
            .show()
            .html("Edellisen päivän jälkeen: <span>" + sign + s_to_hms(liukuma) + "</span>")
            .find("span").css("color", color)
            .after("<p style = 'font-size: 12px; margin-top: 4px'>( Asetuksena " + hours + " tuntia / päivä. Pyydä muutosta tarvittaessa. )</p>");
    
        })
        
      }

      // -------------------------------------------------------------------------------------

      // Bar charts

      if ( edit != 1 ) {

        // Labels
        var labels = {
          "toissa"                              : "Töissä",
          "tj_kehitys"                          : "Tietojärjestelmät - Kehitys",
          "tj_tuki"                             : "Tietojärjestelmät - Tuki",
          "love_yllapito"                       : "LOVe - Ylläpito",
          "love_tuki"                           : "LOVe - Tuki",
          "love_sisallontuotanto"               : "LOVe - Sisällöntuotanto",
          "muut_verkkokurssit_yllapito"         : "Muut verkkokurssit - Ylläpito",
          "muut_verkkokurssit_tuki"             : "Muut verkkokurssit - Tuki",
          "muut_verkkokurssit_sisallontuotanto" : "Muut verkkokurssit - Sisällöntuotanto",
          "muut_tuotteet_kehitys"               : "Muut tuotteet - Kehitys",
          "muut_tuotteet_tuki"                  : "Muut tuotteet - Tuki",
          "yhteiset_tyokalut"                   : "Yhteiset työkalut",
          "testaus"                             : "Testaus",
          "nettisivut"                          : "Nettisivut",
          "verkkoinfrastruktuuri"               : "Verkkoinfrastruktuuri",
          "microsoft_365"                       : "Microsoft 365",
          "ruotsinnos"                          : "Ruotsinnos",
          "las_ruotsinnos"                      : "LAS-ruotsinnos",
          "ger_ruotsinnos"                      : "GER-ruotsinnos",
          "naytto"                              : "NÄYTTÖ",
          "psyk"                                : "PSYK",
          "syto"                                : "SYTO",
          "sopimukset_tarjoukset"               : "Sopimukset & tarjoukset",
          "sisainen_viestinta"                  : "Sisäinen viestintä",
          "sisaiset_palaverit"                  : "Sisäiset palaverit",
          "asiakasviestinta"                    : "Asiakasviestintä",
          "asiakaspalaverit"                    : "Asiakaspalaverit",
          "koulutukset"                         : "Koulutukset",
          "koulutusten_valmistelu"              : "Koulutusten valmistelu",
          "taloushallinto"                      : "Taloushallinto",
          "hallinnointipalvelut"                : "Hallinnointipalvelut",
          "henkilostohallinto"                  : "Henkilöstöhallinto",
          "laatutyo"                            : "Laatutyö",
          "laskutettava_tuntityo"               : "Laskutettava tuntityö",
          "tyomatkat"                           : "Työmatkat",
          "happihyppely"                        : "Happihyppely",
          "palkallinen_poissaolo"               : "Palkallinen poissaolo",
          "liukumavahennys"                     : "Liukumavähennys",
          "lounastauko"                         : "Lounastauko"
        };

        // Sort times
        var times_sorted = [];
        var n = Object.keys(labels).length;

        for ( var i = 0; i < n; i++ ) {

          var label = Object.keys(labels)[i];
          var time  = times[label];
          times_sorted.push(time);

        }

        times = times_sorted;

        // Colors
        var colors = {
          "toissa"                              : "#000000",
          "tj_tuki"                             : "#3da9db",
          "tj_kehitys"                          : "#1b6d92",
          "love_tuki"                           : "#ff6699",
          "love_yllapito"                       : "#ff4d88",
          "love_sisallontuotanto"               : "#ff3377",
          "muut_verkkokurssit_tuki"             : "#cc00ff",
          "muut_verkkokurssit_yllapito"         : "#8f00b3",
          "muut_verkkokurssit_sisallontuotanto" : "#520066",
          "muut_tuotteet_tuki"                  : "#b35900",
          "muut_tuotteet_kehitys"               : "#663300",
          "yhteiset_tyokalut"                   : "#ff9900",
          "testaus"                             : "#00ffff",
          "nettisivut"                          : "#009999",
          "verkkoinfrastruktuuri"               : "#004d4d",
          "microsoft_365"                       : "#33cc33",
          "ruotsinnos"                          : "#fecc00",
          "las_ruotsinnos"                      : "#fecc00",
          "ger_ruotsinnos"                      : "#fecc00",
          "naytto"                              : "#fecc00",
          "psyk"                                : "#fecc00",
          "syto"                                : "#fecc00",
          "sopimukset_tarjoukset"               : "#cc9900",
          "sisainen_viestinta"                  : "#ff9999",
          "sisaiset_palaverit"                  : "#ff0000",
          "asiakasviestinta"                    : "#911010",
          "asiakaspalaverit"                    : "#ffe6e6",
          "koulutukset"                         : "#990000",
          "koulutusten_valmistelu"              : "#4d0000",
          "taloushallinto"                      : "#ff4dff",
          "hallinnointipalvelut"                : "#c9c0ed",
          "henkilostohallinto"                  : "#ffccff",
          "laatutyo"                            : "#ffccff",
          "laskutettava_tuntityo"               : "#666699",
          "tyomatkat"                           : "#999966",
          "happihyppely"                        : "#0000ff",
          "palkallinen_poissaolo"               : "#669900",
          "liukumavahennys"                     : "#228B22",
          "lounastauko"                         : "#009933"
        };
  
        labels = Object.values(labels);
        colors = Object.values(colors);
  
        // stepSize & max
        var stepSize;
        var max = Math.max(...times);
  
        if ( max == 0 ) {
          stepSize = 1 * 3600;
          max      = 10 * 3600;
        } else if ( max <= 10 * 3600 ) {
          stepSize = 1 * 3600;
          max     /= 3600;
          max      = Math.ceil(max / 10) * 10;
          max     *= 3600;
        } else if ( max <= 100 * 3600 ) {
          stepSize = 5 * 3600;
          max     /= 3600;
          max      = Math.ceil(max / 10) * 10;
          max     *= 3600;
        } else if ( max <= 1000 * 3600 ) {
          stepSize = 50 * 3600;
          max     /= 3600;
          max      = Math.ceil(max / 100) * 100;
          max     *= 3600;
        } else if ( max <= 2000 * 3600 ) {
          stepSize = 100 * 3600;
          max     /= 3600;
          max      = Math.ceil(max / 100) * 100;
          max     *= 3600;
        } else {
          stepSize = 1000 * 3600;
          max     /= 3600;
          max      = Math.ceil(max / 1000) * 1000;
          max     *= 3600;
        }
        
        // Chart 1
        if ( salary_period != 1 ) {
  
          new Chart(
  
              document.getElementById("chart1"),
  
              {
  
                type: 'bar',
  
                data: {
                  labels:   labels,
                  datasets: [ { data: times, backgroundColor: colors } ]
                },
  
                options: {
                  title:  { display: true,  text: "Työajat" },
                  legend: { display: false }, 
                  scales: { 
                    xAxes: [ { ticks: { autoSkip: false } } ],
                    yAxes: [ { ticks: { callback: function(value) { return s_to_hms(value); }, stepSize: stepSize, min: 0, max: max } } ]
                  },
                  tooltips: { callbacks: { label: function(tooltipItem) { return s_to_hms(tooltipItem.yLabel); } } }
                }
  
              }
  
          );
  
        }
  
        // Chart 2
        if ( salary_period == 1 ) {
  
          $("#chart1").hide();
          $("#chart2").show();
  
          $("#chart2_data").load("chart2.php?name=" + user_ + "&day=" + day + "&month=" + month + "&year=" + year + "&uniqueID=" + uniqueID, function () {
  
            var times = $(this).text();
  
            times = JSON.parse(times);
  
            // Array of objects into a single object
            var times_temp = times[0];
          
            for ( var i = 1; i < times.length; i++ ) {
              var key         = Object.keys(times[i]);
              var value       = Object.values(times[i])[0];
              times_temp[key] = value;
            }

            times = times_temp;
              
            var days = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  
            day = day_copy;
           
            // Filter out days of the month that don't exist
            if ( day <= 25 ) {
  
              month0 = ( month - 2 >= 0 ) ? month - 2 : 11;
              year0  = ( month - 2 >= 0 ) ? year : year - 1;
  
              for ( var day_ = 28; day_ <= 31; day_++ ) {
  
                var date = new Date(year0, month0, day_);
  
                if ( date.getDate() != day_ || date.getMonth() != month0 || date.getFullYear() != year0 )
                  days = days.filter( day__ => day__ != day_ );
  
              }
  
            } else {
  
              for ( var day_ = 28; day_ <= 31; day_++ ) {
  
                var date = new Date(year, +month - 1, day_);
  
                if ( date.getDate() != day_ || date.getMonth() != ( +month - 1 ) || date.getFullYear() != year )
                  days = days.filter( day__ => day__ != day_ );
  
              }
  
            }
  
            // Day value is 0 if it doesn't exist
            var existing_days = Object.keys(times);

            for ( var i = 0; i < days.length; i++ ) {

              var day = days[i].toString();

              if ( !existing_days.includes(day) )
                times[day] = "0";

            }
  
            // Labels & values
            var labels = days;
            var values = [];
            for ( var i = 0; i < labels.length; i++ )
              values.push(times[labels[i]]);
  
            // Colors
            var colors = []
  
            for ( var i = 0; i < values.length; i++ ) {
  
              var value = values[i];
              var color;
  
              if      ( value <= 1 * 3600 ) color = "#00e600";
              else if ( value <= 2 * 3600 ) color = "#00cc00"; 
              else if ( value <= 3 * 3600 ) color = "#00b300";
              else if ( value <= 4 * 3600 ) color = "#009900";
              else if ( value <= 5 * 3600 ) color = "#008000";
              else if ( value <= 6 * 3600 ) color = "#006600";
              else if ( value <= 7 * 3600 ) color = "#004d00";
              else if ( value <= 8 * 3600 ) color = "#003300";
              else if ( value <= 9 * 3600 ) color = "#001a00";
              else if ( value == "poissa" ) color = "red";
              else if ( value == "sairas" ) color = "blue";
              else if ( value == "loma"   ) color = yellow;
              else                          color = "#000000";
  
              colors.push(color);
  
            }
  
            // Tooltip labels
            var values_copy = values;
  
            function getLabels(tooltipItem) {
  
              var label;
              
              if      ( values_copy[tooltipItem.index] == "poissa" ) label = "Poissa";
              else if ( values_copy[tooltipItem.index] == "sairas" ) label = "Sairas";
              else if ( values_copy[tooltipItem.index] == "loma" )   label = "Loma";
              else                                                   label = s_to_hms(tooltipItem.yLabel);
              
              return label;
  
            }
  
            // Height of away, sick, holiday bars
            var hours = ( user != "Heli Haavisto" ) ? 7.5 : 7;
  
            values = values.map( value => value = ( value == "poissa" || value == "sairas" || value == "loma") ? hours * 3600 : value );

            // Click bars
            function goToDay(event, item) {

              var d = item[0]["_model"].label;
              var m = month;
              var y = year;

              day = day_copy;

              if ( day < 26 ) {

                if ( d >= 26 ) {
                  m = ( month - 1 != 0 ) ? month - 1 : 12;
                  y = ( month - 1 != 0 ) ? year : year - 1;
                }

              } 

              if ( day >= 26 ) {

                if ( d < 26 ) {
                  m = ( month + 1 != 13 ) ? month + 1 : 1;
                  y = ( month + 1 != 13 ) ? year : year + 1;
                }

              }

              window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=" + person + "&day=" + d + "&month=" + m + "&year=" + y + "&edit=" + "&uniqueID=" + uniqueID;
              
            }
                
            // Chart 2
            new Chart(
  
              document.getElementById("chart2"),
    
              {
  
                type: 'bar',
    
                data: {
                  labels:   labels,
                  datasets: [ { data: values, backgroundColor: colors } ]
                },
    
                options: {
  
                  title:  { display: true, text: 'Päivittäiset työajat' },
                  legend: { display: false }, 
                  scales: { 
                    xAxes: [ { ticks: { autoSkip: false } } ],
                    yAxes: [ { ticks: { callback: function(value) { return s_to_hms(value); }, stepSize: 1 * 3600, min: 0, max: 10 * 3600 } } ]
                  },
                  tooltips: { callbacks: { label: function(tooltipItem) { return getLabels(tooltipItem); } } },
                  onClick: goToDay
  
                }
              }
  
            );
            
          })
  
        }

      }
  
    });

    //#region

    // Hide / show

    if ( edit == "" && salary_period == "" ) {
      $("#section").text("Tilastot");
      $("hr[id=9]").show();
    }

    if ( edit == 1 ) {

      $("#section").text("Tietojen muokkaus");
      $("#away_sick_holiday, hr[id=8], #cancel_edits_save_edits").show();
      $("#filter, #charts, #counts, #return_salary_period_edit").hide();
        
    }

    if ( salary_period == 1 ) {

      $("#section").text("Palkanmaksujakso");

      day   = parseInt(day);
      month = parseInt(month);
      year  = parseInt(year);

      if ( day <= 25 ) {

        var previous_month = ( month - 1 != 0 ) ? month - 1 : 12;
        var previous_year  = ( month - 1 != 0 ) ? year : year - 1;

        var startDate = "26." + previous_month + "." + previous_year;
        var endDate   = "25." + month + "." + year;

        $("#date").text(startDate + " - " + endDate);

      } else {

        next_month = ( month + 1 != 13 ) ? month + 1 : 1;
        next_year  = ( month + 1 != 13 ) ? year : year + 1;

        var startDate = "26." + month + "." + year;
        var endDate   = "25." + next_month + "." + next_year;

        $("#date").text(startDate + " - " + endDate);

      }

      $("#prev_next, #chart2, hr[id=7]").show();
      $("#filter, #edit, #salary_period").hide();

      $("#charts").css("margin-bottom", "-20px");

      if ( ( user == "Riikka Panu" || user == "Jarkko Wallenius" ) && asDate( day + "." + month + "." + year ) <= asDate( getDate() ) ) {
          $("#report").show();
          $("#report").css("margin-top", "35px").css("margin-bottom", "-10px");
      }

      $("#return_salary_period_edit").css("margin-left", "10px");
      
    }

    if ( day == "" || month == "" || year == "" || user2 != "" )
      $("#edit").hide();

    //#endregion

    //#region

    // Click handlers

    // Suodata
    $("#filter").find("button").click( function() {
      $("#filters").slideToggle("fast");
      $("#times").css("margin-top", "35px");
    });

    // Tyhjennä valinnat
    $("#remove").click( function() {
      $("#person, #day, #month, #year").val("");
    });

    // Tämä päivä
    $("#this_day").click( function () {
  
      $("#day").val(day_today);
      $("#month").val(month_today);
      $("#year").val(year_today);

    });

    // Näytä
    $(document).on("click", "#show", function() {

      person = $("#person").val();
      day    = $("#day").val();
      month  = $("#month").val();
      year   = $("#year").val();

      // Check if valid date
      if ( day != "" && month != "" && year != "" ) {
         
        var date = new Date(year, +month - 1, day);

        if ( date.getDate() != day || date.getMonth() != ( +month - 1 ) || date.getFullYear() != year ) {
          alert(day + "." + month + "." + year + " ei ole validi päivämäärä");
          return;
        }
      
      }

      // Subordinate's data
      if ( person != "" && person != "1" ) {
        userID2 = $("#person").val();
        person  = 1;
      }
      else
        userID2 = "";

      window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=" + person + "&day=" + day + "&month=" + month + "&year=" + year + "&edit="  +  "&uniqueID=" + uniqueID;

    });

    // Return
    $("#return").click( function() {

      if ( salary_period != 1 )
        window.location.href = "index.html?userID=" + userID + "&uniqueID=" + uniqueID;
        
      if ( salary_period == 1 )
        window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=" + person + "&day=" + day_today + "&month=" + month_today + "&year=" + year_today + "&edit=" + "&salary_period=" + "&uniqueID=" + uniqueID;
        
    });

    // Palkanmaksujakso
    $("#salary_period").click( function () {
      window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=1" + "&day=" + day_today + "&month=" + month_today + "&year=" + year_today + "&edit=" + "&salary_period=1" + "&uniqueID=" + uniqueID;
    });

    // Muokkaa
    $("#edit").click( function() {
      window.location.href = "stats.html?userID=" + userID + "&person=1" + "&day=" + day + "&month=" + month + "&year=" + year + "&edit=1" + "&uniqueID=" + uniqueID;
    });

    // Click time
    $(".time").click( function() {

      if ( edit == "1" ) {

        if ( $("#away").hasClass("on") || $("#sick").hasClass("on") || $("#holiday").hasClass("on") )
          return;

        var task = $(this).prev(".task").text();

        if ( task == "Töissä" )
          var hms = $("div[id=tyokohde1]").find(".time").text();
        else
          var hms = $(this).text();

        var h = parseInt(hms.split(":")[0]);
        var m = parseInt(hms.split(":")[1]);
        var s = parseInt(hms.split(":")[2]);

        var addElems = "";

        addElems += "   <div class = 'editTimes'>";
        addElems += "   <span class = 'h'><input type = 'text' value = " + h + " size = '3' maxlength = '3'></span>";
        addElems += " : <span class = 'm'><input type = 'text' value = " + m + " size = '3' maxlength = '2'></span> "
        addElems += " : <span class = 's'><input type = 'text' value = " + s + " size = '3' maxlength = '2'></span> "
        addElems += "   <button type = 'button' class = 'ok'>Ok</button>"
        addElems += "   </div>";
        
        $(this).after(addElems);
        
        $(this).hide();

      }

    });

    // Ok
    $(document).on("click", ".ok", function() {

      var h = $(this).siblings(".h").find("input").val();
      var m = $(this).siblings(".m").find("input").val();
      var s = $(this).siblings(".s").find("input").val();

      var tarkistaSyotteet = "Tarkista antamasi syötteet";

      if      ( !isNumeric(h) || !( h >= 0 ) )           alert(tarkistaSyotteet);
      else if ( !isNumeric(m) || !( m >= 0 && m < 60 ) ) alert(tarkistaSyotteet);
      else if ( !isNumeric(s) || !( s >= 0 && s < 60 ) ) alert(tarkistaSyotteet);
      else {

        var task = $(this).parent().siblings(".task").text();

        if ( task == "Töissä" )
          var $time = $("div[id=tyokohde1]").find(".time");
        else 
          var $time = $(this).closest("div[id^=tyokohde], #liukumavahennys, #lounastauko").find(".time");

        h = parseInt(h);
        m = parseInt(m);
        s = parseInt(s);

        var time = 3600 * h + 60 * m + 1 * s;

        $time.text(s_to_hms(time)).show();

        $time.text() != "00:00:00" ? $time.css("color", "green") : $time.css("color", "red");

        $(this).closest(".editTimes").remove();

        // Sum
        var sum = 0;

        $("div[id^=tyokohde]").each( function () {

          if ( $(this).css("display") == "none" || $(this).find(".liukumavahennys").length )
            return true;

          time = $(this).find(".time").text();
          sum += hms_to_s(time);

        });

        var $sum = $("#sum").find(".time");

        $sum.text(s_to_hms(sum)).show();

        $sum.text() != "00:00:00" ? $sum.css("color", "green") : $sum.css("color", "red");

      }
      
    });

    // Poissa, sairas, loma
    $("#away, #sick, #holiday").click( function () {

      var $button = $(this);

      if ( !$button.hasClass("on") ) {

        $("button").not("#" + $button.prop("id") + ", #cancel_edits, #save_edits").prop("disabled", true);
        $("div[id^=tyokohde], #sum, #liukumavahennys, #lounastauko").css("opacity", 0.5);
        $button.html( $button.text() + "&nbsp;&#9989;" );
        $button.addClass("on");

      } else {

        $("button").prop("disabled", false);
        $("div[id^=tyokohde], #sum, #liukumavahennys, #lounastauko").css("opacity", 1);
        $button.html( $button.html().split("&")[0] );
        $button.removeClass("on");

      }

    });

    // Cancel edits
    $("#cancel_edits").click( function() {
      window.location.href = "stats.html?userID=" + userID + "&person=1" + "&day=" + day + "&month=" + month + "&year=" + year + "&edit=" + "&uniqueID=" + uniqueID;
    });

    // Save edits
    $("#save_edits").click( function() {

      if ( kuukausipalkallinen(user) && ( $("#sick").hasClass("on") || $("#holiday").hasClass("on") ) ) {

        if ( isHoliday( asDate(day + "." + month + "." + year) ) ) {
          alert(day + "." + month + "." + year + " on vapaa-/pyhäpäivä");
          return;
        }

        // if ( asDate(day + "." + month + "." + year).getDay() == 0 ) {
        //   alert(day + "." + month + "." + year + " on sunnuntai");
        //   return;
        // }

      }
        
      // Name, date
      user_ = user_.replace(/ä/g, "replacethis");
      var date = day + "." + month + "." + year;

      // Timers
      var timers = '{ "running": false, "startTime": 0, "lastStartTime" : 0, "pauseStartTime": 0, "pauseLength": 0, "notified": false }, ';
      timers = "[" + timers.repeat(kaikki_kohteet_index.length).replace(/, $/, "") + "]";
      timers = JSON.parse(timers);

      // Query string
      var queryString = "name=" + user_ + "&date=" + date;
      
      $("div[id^=tyokohde], #liukumavahennys, #lounastauko").each( function() {
        
        var tyokohde = $(this).find(".task").text();
            tyokohde = tyokohde.replace("Tietojärjestelmät", "TJ");
            tyokohde = asQueryParameter(tyokohde);

        var time = $(this).find(".time").text();
            time = time != "" ? time : "00:00:00";
            time = hms_to_s(time);
        
        if ( time != 0 ) {

          var arr = {
            "toissa"                              : 0,
            "tj_kehitys"                          : 1,
            "tj_tuki"                             : 2,
            "love_yllapito"                       : 3,
            "love_tuki"                           : 4,
            "love_sisallontuotanto"               : 5,
            "muut_verkkokurssit_yllapito"         : 6,
            "muut_verkkokurssit_tuki"             : 7,
            "muut_verkkokurssit_sisallontuotanto" : 8,
            "muut_tuotteet_kehitys"               : 9,
            "muut_tuotteet_tuki"                  : 10,
            "yhteiset_tyokalut"                   : 11,
            "testaus"                             : 12,
            "nettisivut"                          : 13,
            "verkkoinfrastruktuuri"               : 14,
            "microsoft_365"                       : 15,
            "ruotsinnos"                          : 16,
            "las_ruotsinnos"                      : 17,
            "ger_ruotsinnos"                      : 18,
            "naytto"                              : 19,
            "psyk"                                : 20,
            "syto"                                : 21,
            "sopimukset_tarjoukset"               : 22,
            "sisainen_viestinta"                  : 23,
            "sisaiset_palaverit"                  : 24,
            "asiakasviestinta"                    : 25,
            "asiakaspalaverit"                    : 26,
            "koulutukset"                         : 27,
            "koulutusten_valmistelu"              : 28,
            "taloushallinto"                      : 29,
            "hallinnointipalvelut"                : 30,
            "henkilostohallinto"                  : 31,
            "laatutyo"                            : 32,
            "laskutettava_tuntityo"               : 33,
            "tyomatkat"                           : 34,
            "happihyppely"                        : 35,
            "palkallinen_poissaolo"               : 36,
            "liukumavahennys"                     : 37,
            "lounastauko"                         : 38
          }

          var i = arr[tyokohde];
        	
          timers[i]["running"]        = "pause"
          timers[i]["startTime"]      = Date.now() - time * 1000;
          timers[i]["lastStartTime"]  = Date.now() - time * 1000;
          timers[i]["pauseStartTime"] = Date.now();
          
          if ( tyokohde != "lounastauko" )
            timers[i]["notified"] = time >= 2 * 3600
          else
          	timers[i]["notified"] = time >= 0.5 * 3600
          	
        }
        
        queryString += "&" + tyokohde + "=" + time;
  
      });

      var poissa = $("#away").hasClass("on")    ? 1 : 0;
      var sairas = $("#sick").hasClass("on")    ? 1 : 0;
      var loma   = $("#holiday").hasClass("on") ? 1 : 0;

      queryString += "&poissa=" + poissa + "&sairas=" + sairas + "&loma=" + loma;

      var poissa_sairas_loma = { "poissa" : poissa, "sairas": sairas, "loma": loma };

      timers.push(poissa_sairas_loma);

      queryString += "&timers=" + JSON.stringify(timers);
      
      // Update data
      $("#update_data").load("update_data.php?" + queryString, function() {
        window.location.href = "stats.html?userID=" + userID + "&person=1" + "&day=" + day + "&month=" + month + "&year=" + year + "&edit=" + "&uniqueID=" + uniqueID;
      });
    
    });

    // Edellinen
    $("#prev").click( function() {
      month -= 1;
      if ( month == 0 ) {
        month = 12;
        year -= 1;
      }
      window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=1" + "&day=" + day + "&month=" + month + "&year=" + year + "&edit=" + "&salary_period=1" + "&uniqueID=" + uniqueID;
    })

    // Seuraava
    $("#next").click( function() {
      month += 1;
      if ( month == 13 ) {
        month = 1;
        year += 1;
      }
      window.location.href = "stats.html?userID=" + userID + "&userID2=" + userID2 + "&person=1" + "&day=" + day + "&month=" + month + "&year=" + year + "&edit=" + "&salary_period=1" + "&uniqueID=" + uniqueID;
    })

    // Download report
    $("#report").find("button").click( function () {

      var previous_month = ( month - 1 != 0 ) ? month - 1 : 12;
      var previous_year  = ( month - 1 != 0 ) ? year : year - 1;

      var next_month = ( month + 1 != 13 ) ? month + 1 : 1;
      var next_year  = ( month + 1 != 13 ) ? year : year + 1;

      if ( day <= 25 ) {  

        var month1 = previous_month;
        var year1  = previous_year;
        var month2 = month;
        var year2  = year;

      } else {

        var month1 = month;
        var year1  = year;
        var month2 = next_month;
        var year2  = next_year;

      }

      var start = 26 + "." + month1 + "." + year1;
      var end   = 25 + "." + month2 + "." + year2;

      var num_work_days = getDates(start, end).filter( day => !isWeekend(day) && !isHoliday(day) ).length;

      // Liukumasaldot
      var date_start = "26.4.2021";
      var date_end;

      if ( month == month_today || ( month == previous_month && day >= 26 ) )
        date_end = day + "." + month + "." + year;
      else if ( month != month_today ) {
        if ( day <= 25 )
          date_end = 25 + "." + month + "." + year;
        else
          date_end = 25 + "." + next_month + "." + next_year;
      }
    
      $("#liukumat_data").load("liukumat.php?date_start=" + date_start + "&date_end=" + date_end, function() {

        var input = $(this).text();
          
        input = JSON.parse(input);
        
        var liukumat = [];

        for ( var i = 0; i < input.length; i++ ) {

          var nimi = input[i][0];

          if ( tuntityontekija(nimi) ) {
            liukumat.push("-");
            continue;
          }

          var sum               = parseInt(input[i][1]);
          var poissaolot        = parseInt(input[i][2]);
          var sairauspoissaolot = parseInt(input[i][3]);
          var lomapaivat        = parseInt(input[i][4]);

          date_start = "26.4.2021";
        
          if ( nimi == "Elisa Mäkinen" ) {
            date_start = "11.5.2021";
          }

          if ( nimi == "Mirelle Kangas" ) {
            date_start = "6.8.2021";
          }

          num_days  = getDates(date_start, date_end).filter( day => !isWeekend(day) && !isHoliday(day) ).length;
          num_days -= poissaolot;
          num_days -= sairauspoissaolot;
          num_days -= lomapaivat;
  
          var balance;
          
          if ( nimi == "Heli Rokkonen" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("41:15:00");
          else if ( nimi == "Valtteri Anttila" && asDate(day + "." + month + "." + year) >= asDate("26.4.2021") )
            balance = hms_to_s("09:41:30");
          else
            balance = 0;
  
          var hours = 7.5;
          if ( nimi == "Heli Haavisto" )
            hours = 7;
        
          var liukuma = sum + balance - num_days * hours * 3600;
          var sign    = liukuma >= 0 ? "plus" : "-";
          liukuma     = Math.abs(liukuma);
          liukuma     = sign + s_to_hms(liukuma);

          liukumat.push(liukuma);
  
        }

        $("#report_data").load("report.php?day=" + day + "&month=" + month + "&year=" + year + "&num_work_days=" + num_work_days + "&liukumat=" + liukumat + "&uniqueID=" + uniqueID, function() {

          if ( day <= 25 )
            window.location.href = "download.php?file=tyotunnit_" + month + "_" + year + ".xlsx";
          else
            window.location.href = "download.php?file=tyotunnit_" + next_month + "_" + next_year + ".xlsx";
            
        });

      })

    });

    //#endregion
  
  });

});