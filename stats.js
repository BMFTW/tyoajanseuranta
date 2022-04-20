

$(document).ready(function () {

  var user = $("#user").text();

  $.getScript("vars_funs.js", function() {

    var day           = $("#data input[name=day]").val();
    var month         = $("#data input[name=month]").val();
    var year          = $("#data input[name=year]").val();
    var person        = $("#data input[name=person]").val();
    var edit          = $("#data input[name=edit]").val();
    var salary_period = $("#data input[name=salary_period]").val();
    var user2         = $("#data input[name=user2]").val();

    person        = person == "" ? "0" : person;
    edit          = edit == "" ? "0" : edit;
    salary_period = salary_period == "" ? "0" : salary_period;
    user2         = user2.trim() == "" ? "0" : user2.replace("_", " ");

    console.log("day: " + day);
    console.log("month: " + month);
    console.log("year: " + year);
    console.log("person: " + person);
    console.log("edit: " + edit);
    console.log("salary_period: " + salary_period);
    console.log("user2: " + user2);

    console.log("----------------------------------------------------------------");

    // -------------------------------------------------------------------------------------

    var day_copy = day;

    // -------------------------------------------------------------------------------------

    // #name
    person !== "0" ? $("#user").text(user) : $("#user").text("Kaikki työntekijät");
    
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
    person == "1" ? $("#person").val("1") : $("#person").val("0");
    
    $("#day").val(day);
    $("#month").val(month);
    $("#year").val(year);

    // -------------------------------------------------------------------------------------

    if ( user == "Riikka Panu" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Mirelle Kangas"    ) );
      $("#person").append( new Option( "Otto Kontio"       ) );
      $("#person").append( new Option( "Simo Korpela"      ) );
      $("#person").append( new Option( "Eeli Kuosmanen"    ) );
      $("#person").append( new Option( "Elisa Mäkinen"     ) );
      $("#person").append( new Option( "Päivi Palonen"     ) );
      $("#person").append( new Option( "Oskari Riihimäki"  ) );
      $("#person").append( new Option( "Emma Ruotsalainen" ) );
      
    }

    if ( user == "Heli Rokkonen" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Roope Anttila",    "594585"  ) );
      $("#person").append( new Option( "Valtteri Anttila", "3358000" ) );
      $("#person").append( new Option( "Heli Haavisto",    "1719150" ) );
      $("#person").append( new Option( "Elina Hanslian",   "2294025" ) );
      $("#person").append( new Option( "Tuukka Monto",     "2353520" ) );
      $("#person").append( new Option( "Kaisa Saano",      "1334440" ) );
      $("#person").append( new Option( "Jaakko Saano",     "2913065" ) );
      
    }

    if ( user == "Jarkko Wallenius" ) {
      
      $("#person").append( new Option("-----------------------", "sep") );
      $("#person").find("option[value=sep]").prop("disabled", true);

      $("#person").append( new Option( "Roope Anttila"     ) );
      $("#person").append( new Option( "Valtteri Anttila"  ) );
      $("#person").append( new Option( "Heli Haavisto"     ) );
      $("#person").append( new Option( "Elina Hanslian"    ) );
      $("#person").append( new Option( "Mirelle Kangas"    ) );
      $("#person").append( new Option( "Otto Kontio"       ) );
      $("#person").append( new Option( "Simo Korpela"      ) );
      $("#person").append( new Option( "Eeli Kuosmanen"    ) );
      $("#person").append( new Option( "Tuukka Monto"      ) );
      $("#person").append( new Option( "Elisa Mäkinen"     ) );
      $("#person").append( new Option( "Päivi Palonen"     ) );
      $("#person").append( new Option( "Riikka Panu"       ) );
      $("#person").append( new Option( "Oskari Riihimäki"  ) );
      $("#person").append( new Option( "Heli Rokkonen"     ) );
      $("#person").append( new Option( "Emma Ruotsalainen" ) );
      $("#person").append( new Option( "Jaakko Saano"      ) );
      $("#person").append( new Option( "Kaisa Saano"       ) );
      
    }

    $("#person").find("option:gt(2)").each( function() {

      var value = $(this).text().trim().replace(" ", "_");

      $(this).val(value);

    });

    // -------------------------------------------------------------------------------------

    // Näytä kohteet
    // user / user2?
    if ( typeof user2 == "undefined" || user2 == "" || user2 == "0" ) {

      if ( person == "1" ) {
        naytaKaikkienKohteet_stats();
      } else {
        naytaKohteet_stats(kaikki_kohteet_stats);
      }

      user_2 = "0";

    }
    
    else {

      user   = user2;
      user_2 = user2.replace(" ", "_");

      naytaKaikkienKohteet_stats();

      $("#user").text(user2);
      $("#person").find("option:contains(" + user2 + ")").prop("selected", true);

      if ( tuntityontekija(user2) ) {

        // Liukumavähennys & lounastauko
        $("#liukumavahennys").parent().css("display", "none");
        $("#lounastauko").parent().removeClass("col-sm-6").addClass("col-sm-12");

      }

    }

    // -------------------------------------------------------------------------------------

    // Get stats
    $("#times_data").load("get_stats.php?day=" + day + "&month=" + month + "&year=" + year + "&person=" + person + "&salary_period=" + salary_period + "&user2=" + user_2, function () {
     
      var times = $(this).text();

      times = JSON.parse(times);
        
      var poissa = times["poissa"] !== null ? times["poissa"] : 0;
      var sairas = times["sairas"] !== null ? times["sairas"] : 0;
      var loma   = times["loma"]   !== null ? times["loma"]   : 0;

      // Poissaolo / sairauspoissaolo / loma
      if ( ( poissa == 1 || sairas == 1 || loma == 1 ) && ( day != "" && month != "" && year != "" ) && ( edit == "0" && salary_period == "0" ) ) {
       
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

        if ( sairas == 1 ) {

          delete times.poissa;
          delete times.sairas;
          delete times.loma;
          delete times.liukumavahennys;
          delete times.lounastauko;

          var sum = Object.values(times).map( time => parseInt(time) ).reduce( (a, b) => a + b );
              sum = s_to_hms(sum);

          if ( sum != "00:00:00" ) {
            $("#txt").css("margin-top", "50px").css("margin-bottom", "25px");
            $("#txt").after("<h1 id = 'sick_time' style = 'text-align: center; color: blue'>" + sum + "</h1>");
            $("#sick_time").css("margin-bottom", "50px");
          }

        }

        return false;
        
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

      if ( edit == "1" ) {

        if ( poissa == "1" )
          $("#away").click();
        else if ( sairas == "1" )
          $("#sick").click();
        else if ( loma == "1" )
          $("#holiday").click();

      }

      if ( salary_period == "1" ) {

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
      // Liukuma

      if ( kuukausipalkallinen(user) && person != "0" && edit != "1" && ( salary_period != "1" || ( salary_period == "1" && ( month == ( new Date().getMonth() + 1 ) && year == new Date().getFullYear() ) ) ) ) {

        var date_start = "26.4.2021";

        if ( user == "Elisa Mäkinen" ) {
          date_start = "11.5.2021";
        } 
        
        if ( user == "Mirelle Kangas" ) {
          date_start = "6.8.2021";
        }

        var date_end = day + "." + month + "." + year;

        $("#liukuma").load("liukuma.php?date_start=" + date_start + "&date_end=" + date_end + "&user2=" + user_2, function() {

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

        $("#liukuma_edellinen").load("liukuma.php?date_start=" + date_start + "&date_end=" + date_yesterday + "&user2=" + user_2, function() {

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
          "eloki"                               : "eLOKI",
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
          "eloki"                               : "#3333ff",
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
  
          $("#chart2_data").load("chart2.php?day=" + day + "&month=" + month + "&year=" + year + "&user2=" + user_2 + "&uniqueID=" + uniqueID, function () {
  
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
  
              previous_month = ( month - 1 >= 1 ) ? month - 1 : 12;
              previous_year  = ( month - 1 >= 1 ) ? year : year - 1;
  
              for ( var day_i = 28; day_i <= 31; day_i++ ) {

                date = day_i + "." + previous_month + "." + previous_year;

                if ( !isValidDate(date) )
                  days = days.filter( day_elem => day_elem != day_i );
  
              }
  
            } else {
  
              for ( var day_i = 28; day_i <= 31; day_i++ ) {

                date = day_i + "." + month + "." + year;

                if ( !isValidDate(date) )
                  days = days.filter( day_elem => day_elem != day_i );
  
              }
  
            }

            // February & March 2022 exceptions
            if ( $("#date").text().includes(".1.2022 -") ) {
              $("#date").text("26.1.2022 - 23.2.2022");
              days = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            }
            if ( $("#date").text().includes(".2.2022 -") ) {
              $("#date").text("24.2.2022 - 25.3.2022");
              days = ["24.2.", "25.2.", 26, 27, 28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
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

            // February & March 2022 exceptions
            if ( labels[0] == "24.2." ) labels[0] = 24;
            if ( labels[1] == "25.2." ) labels[1] = 25;

            // Colors
            var colors = [];
            var color;
            var value;

            values = values.map( value => typeof value == "undefined" ? "0" : value );
  
            for ( var i = 0; i < values.length; i++ ) {
  
              value = values[i];
  
              if      ( value <= 1 * 3600 )        color = "#00e600";
              else if ( value <= 2 * 3600 )        color = "#00cc00"; 
              else if ( value <= 3 * 3600 )        color = "#00b300";
              else if ( value <= 4 * 3600 )        color = "#009900";
              else if ( value <= 5 * 3600 )        color = "#008000";
              else if ( value <= 6 * 3600 )        color = "#006600";
              else if ( value <= 7 * 3600 )        color = "#004d00";
              else if ( value <= 8 * 3600 )        color = "#003300";
              else if ( value <= 9 * 3600 )        color = "#001a00";
              else if ( value == "poissa" )        color = "red";
              else if ( value.includes("sairas") ) color = "blue";
              else if ( value == "loma")           color = yellow;
              else                                 color = "#000000";
  
              colors.push(color);
  
            }

            // Tooltip labels
            var values_copy = values;
  
            function getLabels(tooltipItem) {
  
              var label;
              
              if      ( values_copy[tooltipItem.index] == "poissa" )        label = "Poissa";
              else if ( values_copy[tooltipItem.index].includes("sairas") ) { label = "Sairas" + " - " + s_to_hms(values_copy[tooltipItem.index].split(";")[1]); label = label.replace("- 00:00:00", ""); label = label.includes(":") ? label + " töitä" : label } 
              else if ( values_copy[tooltipItem.index] == "loma" )          label = "Loma";
              else                                                          label = s_to_hms(tooltipItem.yLabel);
              
              return label;
  
            }
            
            values = values.map( value => value.includes("sairas") ? "sairas" : value );
  
            // Height of away, sick, holiday bars
            var hours = 7.5;

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

              // February & March 2022 exceptions
              var index = item[0]["_index"];

              if ( $("#date").text().includes("24.2.2022") && index < 2 )
                m -= 1;

              $("#return_form input[name=day]").val(d);
              $("#return_form input[name=month]").val(m);
              $("#return_form input[name=year]").val(y);
              $("#return_form input[name=person]").val(person);
              $("#return_form input[name=edit]").val("0");
              $("#return_form input[name=salary_period]").val("0");
              $("#return_form input[name=user2]").val(user2);

              $("#return_form").submit();
              
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

    if ( edit == "0" && salary_period == "0" ) {
      $("#section").text("Tilastot");
      $("hr[id=9]").show();
    }

    if ( edit == "1" ) {

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

      $("#return_salary_period_edit").find("div:eq(1)").removeClass("col-md-2").addClass("col-md-12");  
      $("#return").css("margin-left", "25px")

      $("#charts").css("margin-bottom", "-20px");

      if ( ( user == "Riikka Panu" || user == "Jarkko Wallenius" ) && asDate( day + "." + month + "." + year ) <= asDate( getDate() ) ) {
          $("#report").show();
          $("#report").css("margin-top", "35px").css("margin-bottom", "-10px");
      }

      $("#return_salary_period_edit").css("margin-left", "10px");
      
    }

    if ( day == "" || month == "" || year == "" || typeof user2 == "undefined" || person != "1" || user2 != "0" )
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
      $("#person").val("0");
      $("#day, #month, #year").val("");
    });

    // Tämä päivä
    $("#this_day").click( function () {

      var day_today   = new Date().getDate();
      var month_today = new Date().getMonth() + 1;
      var year_today  = new Date().getFullYear();
  
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

      // Check if date is valid
      if ( day != "" && month != "" && year != "" ) {

        var date = day + "." + month + "." + year;

        if ( !isValidDate(date) ) {
          alert(date + " ei ole validi päivämäärä");
          return;
        }
      
      }

      // Subordinate's data
      if ( person == "0" || person == "1" ) {
        user2 = "";  
      } else {
        user2 = $("#person").val();
        person  = 1;
      }

      $("#show_form input[name=day]").val(day);
      $("#show_form input[name=month]").val(month);
      $("#show_form input[name=year]").val(year);
      $("#show_form input[name=person]").val(person);
      $("#show_form input[name=edit]").val("0");
      $("#show_form input[name=salary_period]").val("0");
      $("#show_form input[name=user2]").val(user2);

      $("#show_form").submit();

    });

    // Return
    $("#return").click( function() {

      if ( salary_period != "1" ) {

        $("#return_form").prop("action", "main.php").submit();

      }
        
        
      else {

        day   = new Date().getDate();
        month = new Date().getMonth() + 1;
        year  = new Date().getFullYear();

        $("#return_form input[name=day]").val(day);
        $("#return_form input[name=month]").val(month);
        $("#return_form input[name=year]").val(year);
        $("#return_form input[name=person]").val(person);
        $("#return_form input[name=edit]").val("0");
        $("#return_form input[name=salary_period]").val("0");
        $("#return_form input[name=user2]").val(user2);

        $("#return_form").submit();

      }
        
    });

    // Palkanmaksujakso
    $("#salary_period").click( function () {

      day   = new Date().getDate();
      month = new Date().getMonth() + 1;
      year  = new Date().getFullYear();

      $("#salary_period_form input[name=day]").val(day);
      $("#salary_period_form input[name=month]").val(month);
      $("#salary_period_form input[name=year]").val(year);
      $("#salary_period_form input[name=person]").val("1");
      $("#salary_period_form input[name=edit]").val("0");
      $("#salary_period_form input[name=salary_period]").val("1");
      $("#salary_period_form input[name=user2]").val(user2);

      $("#salary_period").submit();

    });

    // Muokkaa
    $("#edit").click( function() {
      
      $("#edit_form input[name=day]").val(day);
      $("#edit_form input[name=month]").val(month);
      $("#edit_form input[name=year]").val(year);
      $("#edit_form input[name=person]").val("1");
      $("#edit_form input[name=edit]").val("1");
      $("#edit_form input[name=salary_period]").val("0");
      $("#edit_form input[name=user2]").val(user2);

      $("#edit").submit();

    });

    // Click time
    $(".time").click( function() {

      if ( edit == "1" ) {

        if ( $("#away").hasClass("on") || $("#holiday").hasClass("on") )
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

        if ( $time.text() != "00:00:00" ) {

          if ( !$("#sick").hasClass("on") )
              $time.css("color", "green");
          else
              $time.css("color", "blue");

        }
        
        else
            $time.css("color", "red");

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

        if ( $sum.text() != "00:00:00" ) {

          if ( !$("#sick").hasClass("on") )
              $sum.css("color", "green");
          else
              $sum.css("color", "blue");

        }

        else 
            $sum.css("color", "red");


      }
      
    });

    // Poissa, sairas, loma
    $("#away, #sick, #holiday").click( function () {

      var $button = $(this);

      if ( !$button.hasClass("on") ) {

        $("button").not("#" + $button.prop("id") + ", #cancel_edits, #save_edits").prop("disabled", true);
        $button.html( $button.text() + "&nbsp;&#9989;" );
        $button.addClass("on");

        if ( $button.prop("id") != "sick" ) {

          $("input").prop("disabled", true);
          $("#sum, div[id^=tyokohde], #liukumavahennys, #lounastauko").css("opacity", 0.5);

        } else {
        
          $(".ok").prop("disabled", false);

          $(".time").each( function() {
            $(this).text() != "00:00:00" ? $(this).css("color", "blue") : $(this).css("color", "red");
          });
  
        }

      } else {

        $("input, button").prop("disabled", false);
        $("#sum, div[id^=tyokohde], #liukumavahennys, #lounastauko").css("opacity", 1);
        $button.html( $button.html().split("&")[0] );
        $button.removeClass("on");

        $(".time").each( function() {
          $(this).text() != "00:00:00" ? $(this).css("color", "green") : $(this).css("color", "red");
        });

      }

      $("#cancel_edits_form, #save_edits_form").find("input").prop("disabled", false);

    });

    // Cancel edits
    $("#cancel_edits").click( function() {

      $("#cancel_edits_form input[name=day]").val(day);
      $("#cancel_edits_form input[name=month]").val(month);
      $("#cancel_edits_form input[name=year]").val(year);
      $("#cancel_edits_form input[name=person]").val("1");
      $("#cancel_edits_form input[name=edit]").val("0");
      $("#cancel_edits_form input[name=salary_period]").val("0");
      $("#cancel_edits_form input[name=user2]").val(user2);

      $("#cancel_edits_form").submit();

    });

    // Save edits
    $("#save_edits").click( function() {

      if ( kuukausipalkallinen(user) && ( $("#sick").hasClass("on") || $("#holiday").hasClass("on") ) ) {

        if ( isHoliday( asDate(day + "." + month + "." + year) ) ) {
          alert(day + "." + month + "." + year + " on vapaa-/pyhäpäivä");
          return false;
        }

        // if ( asDate(day + "." + month + "." + year).getDay() == 0 ) {
        //   alert(day + "." + month + "." + year + " on sunnuntai");
        //   return;
        // }

      }
        
      // Name, date
      var date = day + "." + month + "." + year;

      // Timers
      var timers = '{ "running": false, "startTime": 0, "lastStartTime" : 0, "pauseStartTime": 0, "pauseLength": 0, "notified": false }, ';
      timers = "[" + timers.repeat(kaikki_kohteet_index.length).replace(/, $/, "") + "]";
      timers = JSON.parse(timers);

      // Query string
      var queryString = "date=" + date;
      
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
            "eloki"                               : 11,
            "yhteiset_tyokalut"                   : 12,
            "testaus"                             : 13,
            "nettisivut"                          : 14,
            "verkkoinfrastruktuuri"               : 15,
            "microsoft_365"                       : 16,
            "ruotsinnos"                          : 17,
            "las_ruotsinnos"                      : 18,
            "ger_ruotsinnos"                      : 19,
            "naytto"                              : 20,
            "psyk"                                : 21,
            "syto"                                : 22,
            "sopimukset_tarjoukset"               : 23,
            "sisainen_viestinta"                  : 24,
            "sisaiset_palaverit"                  : 25,
            "asiakasviestinta"                    : 26,
            "asiakaspalaverit"                    : 27,
            "koulutukset"                         : 28,
            "koulutusten_valmistelu"              : 29,
            "taloushallinto"                      : 30,
            "hallinnointipalvelut"                : 31,
            "henkilostohallinto"                  : 32,
            "laatutyo"                            : 33,
            "laskutettava_tuntityo"               : 34,
            "tyomatkat"                           : 35,
            "happihyppely"                        : 36,
            "palkallinen_poissaolo"               : 37,
            "liukumavahennys"                     : 38,
            "lounastauko"                         : 39
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
        
        $("#save_edits_form input[name=day]").val(day);
        $("#save_edits_form input[name=month]").val(month);
        $("#save_edits_form input[name=year]").val(year);
        $("#save_edits_form input[name=person]").val("1");
        $("#save_edits_form input[name=edit]").val("0");
        $("#save_edits_form input[name=salary_period]").val("0");
        $("#save_edits_form input[name=user2]").val(user2);

        $("#save_edits_form").submit();

      });
    
    });

    // Edellinen
    $("#prev").click( function() {

      month -= 1;

      if ( month == 0 ) {
        month = 12;
        year -= 1;
      }

      $("#salary_period_form input[name=day]").val(day);
      $("#salary_period_form input[name=month]").val(month);
      $("#salary_period_form input[name=year]").val(year);
      $("#salary_period_form input[name=person]").val("1");
      $("#salary_period_form input[name=edit]").val("0");
      $("#salary_period_form input[name=salary_period]").val("1");
      $("#salary_period_form input[name=user2]").val(user2);

      $("#salary_period_form").submit();

    });

    // Seuraava
    $("#next").click( function() {

      month += 1;

      if ( month == 13 ) {
        month = 1;
        year += 1;
      }
      
      $("#salary_period_form input[name=day]").val(day);
      $("#salary_period_form input[name=month]").val(month);
      $("#salary_period_form input[name=year]").val(year);
      $("#salary_period_form input[name=person]").val("1");
      $("#salary_period_form input[name=edit]").val("0");
      $("#salary_period_form input[name=salary_period]").val("1");
      $("#salary_period_form input[name=user2]").val(user2);

      $("#salary_period_form").submit();

    });

    // Download report
    $("#report").find("button").click( function () {

      var date_start;
      var date_end;

      var previous_month = ( month - 1 != 0 ) ? month - 1 : 12;
      var previous_year  = ( month - 1 != 0 ) ? year : year - 1;

      var next_month = ( month + 1 != 13 ) ? month + 1 : 1;
      var next_year  = ( month + 1 != 13 ) ? year : year + 1;

      if ( day <= 25 ) {

        date_start = 26 + "." + previous_month + "." + previous_year;
        date_end   = 25 + "." + month + "." + year;

        // February & March 2022 exceptions
        if ( day <= 23 && month == 2 && year == 2022 )
          date_end = "23.2.2022";
        
        if ( day > 23 && month == 2 && year == 2022 ) {
          date_start = "24.2.2022";
          date_end   = "25.3.2022";
        }

      } else {

        date_start = 26 + "." + month + "." + year;
        date_end   = 25 + "." + next_month + "." + next_year;

        // February & March 2022 exceptions
        if ( next_month == 2 && next_year == 2022 )
          date_end = "23.2.2022";
        if ( next_month == 3 && next_year == 2022 )
          date_start = "24.2.2022";

      }

      var num_work_days = getDates(date_start, date_end).filter( day => !isWeekend(day) ).length;

      // Liukumasaldot
      date_start = "26.4.2021";
    
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
        
          var liukuma = sum + balance - num_days * hours * 3600;
          var sign    = liukuma >= 0 ? "plus" : "-";
          liukuma     = Math.abs(liukuma);
          liukuma     = sign + s_to_hms(liukuma);

          liukumat.push(liukuma);
  
        }

        $("#report_data").load("report.php?day=" + day + "&month=" + month + "&year=" + year + "&num_work_days=" + num_work_days + "&holidays=" + holidays.join(",") + "&liukumat=" + liukumat + "&uniqueID=" + uniqueID, function() {

          // February & March 2022 exceptions
          if ( day <= 23 && month == 2 && year == 2022 )
            window.location.href = "download.php?file=tyotunnit_" + month + "_" + year + ".xlsx";
          else if ( day > 23 && month == 2 && year == 2022 )
            window.location.href = "download.php?file=tyotunnit_" + next_month + "_" + next_year + ".xlsx";

          else if ( day <= 25 )
            window.location.href = "download.php?file=tyotunnit_" + month + "_" + year + ".xlsx";
          else
            window.location.href = "download.php?file=tyotunnit_" + next_month + "_" + next_year + ".xlsx";
            
        });

      })

    });

    //#endregion
  
  });

});