$.getScript("vars_funs.js", function () {

  $(document).ready( function () {

    $("#get_timers").load("get_timers.php?name=" + user_ + "&date=" + getDate() + "&uniqueID=" + uniqueID, function () {

      // Check credentials
      if ( !userIDs.includes(userID) ) {
        window.location.href = "login.html";
        return false;
      }

      // Show work tasks
      naytaKaikkienKohteet_index();

      // Timers

      var timers = $(this).text();

      timers = JSON.parse(timers);

      var poissa_sairas_loma = timers[timers.length - 1];
      
      timers.pop();

      // Variables

      var element;
      var timer;
      var time;
      var timeElapsed;
      var count = [];
      var sum;

      // Functions

      function run(index, pauseLength = 0) {

        timer = timers[index];

        startTime = ( timer["startTime"] == 0 ) ? Date.now() : timer["startTime"];

        timer["startTime"] = startTime;
        timers[index]      = timer;

        startTime += pauseLength;

        count[index] = setInterval( function () {

          timer = timers[index];

          timeElapsed = Date.now() - startTime;
          timeElapsed = Math.floor( timeElapsed / 1000 )

          setTimer(index, timeElapsed);

          // Copy running timer to #displayed1
          var running = $(".toissa .running");

          if ( running.data("name") == "Töissä" )
            running = $(".dropdown-item[data-name=Yhteensä");

          if ( running.length ) {

            var html = running.html();
            var name = html.split("<")[0];
      
            html = html.replace(name, running.data("name") + "&nbsp;&nbsp;&nbsp;").replace("Yhteensä", "Töissä");

            $("#displayed1").html(html);

          }
          
          // Update sum
          sum = 0;

           $(".toissa .time").not(":first, #liukumavahennys .time").each( function () {
            time = $(this).text();
            sum += hms_to_s(time);
          })

          sum = s_to_hms(sum);

          $("#sum").find(".time").text(sum);

          // Notifications
          if ( timer["notified"] == false && notifyNeeded(timers) ) {
          
            if ( Notification.permission == "granted" ) {
              showNotification();
            } else if ( Notification.permission != "denied" ) {
              Notification.requestPermission();
            }

            timer["notified"] = true;
            timers[index] = timer;

            timers.push(poissa_sairas_loma);
            $("#save_timers").load("save_timers.php?name=" + user_ + "&date=" + getDate() + "&timers=" + JSON.stringify(timers));
            timers.pop();

          }
        
        }, 500);

      }

      function pause(index) {
        clearInterval(count[index]);
      }

      function reset(index) {
        setTimer(index, 0);
        pause(index);
      }

      function setTimer(index, time) {
      
        element = $(".dropdown-item, .lounastauko").not("#sum").eq(index).find(".time");
        time    = s_to_hms(time);

        element.text(time)

      }

      function changeState(index) {

        var element = $(".toissa .dropdown-item, .lounastauko").not("#sum").eq(index);

        var yhteensa = $(".dropdown-item[data-name=Yhteensä]");
        var toissa   = $(".dropdown-item[data-name=Töissä]");

        if ( element.data("name") == "Yhteensä" ) {

          toissa.click();

          return;

        }

        timer = timers[index];
        
        // Start
        if ( timer["running"] == false ) {
          timer["running"] = true;
          timer["lastStartTime"] = Date.now();
          timers[index] = timer;
          run(index);
        }

        // Pause
        else if ( timer["running"] == true ) {
          timer["running"] = "pause";
          timer["pauseStartTime"] = Date.now();
          timers[index] = timer;
          pause(index);
        }

        // Resume
        else if ( timer["running"] == "pause" ) {
          timer["running"] = true;
          timer["pauseLength"] += Date.now() - timer["pauseStartTime"];
          timer["lastStartTime"] = Date.now();
          timers[index] = timer;
          run(index, timer["pauseLength"]);
        }

        var lounastauko = index == $(".toissa .dropdown-item, .lounastauko").not(".dropdown-item[data-name=Töissä], #sum").length;

        if ( !lounastauko ) {

          // Start
          if ( !element.hasClass("running") && !element.hasClass("paused") ) {
            element.addClass("running");
            $("#displayed1, #arrow1").removeClass("btn-success").addClass("btn-dark");
          }
          
          // Pause
          else if ( element.hasClass("running") ) {
            element.removeClass("running").addClass("paused");
            $("#displayed1, #arrow1").removeClass("btn-dark").addClass("btn-success");
          }
          
          // Resume
          else if ( element.hasClass("paused") ) {
            element.removeClass("paused").addClass("running");
            $("#displayed1, #arrow1").removeClass("btn-success").addClass("btn-dark");
          }
  
          $(".toissa .running").css("background-color", green);
          $(".toissa .paused").css("background-color", yellow);
  
          if ( toissa.hasClass("running") ) {
            yhteensa.css("background-color", green);
          }
  
          if ( toissa.hasClass("paused") ) {
            yhteensa.css("background-color", yellow);
          }

          if ( !toissa.hasClass("running") && $(".toissa .running").length )
            yhteensa.css("background-color", "grey");
  
        }

        else if ( lounastauko ) {

          // Start
          if ( !element.hasClass("running") && !element.hasClass("paused") ) {
            element.addClass("running");
            element.removeClass("btn-warning").addClass("btn-dark");
          }

          // Pause
          else if ( element.hasClass("running") ) {
            element.removeClass("running").addClass("paused");
            element.removeClass("btn-dark").addClass("btn-warning");  
          }
          
          // Resume
          else if ( element.hasClass("paused") ) {
            element.removeClass("paused").addClass("running");
            element.removeClass("btn-warning").addClass("btn-dark");          
          }

        }

        element.prop("title", setTitle(timer));

      }

      // Initiate

      $(".time").not(":first").each( function (index) {

        timer = timers[index];

        if ( timer["running"] == true ) {

          $(this).closest(".dropdown-item, button").addClass("running");

          run(index, timer["pauseLength"]);

        }

        else if ( timer["running"] == "pause" ) {

          time = timer["pauseStartTime"] - timer["startTime"] - timer["pauseLength"];
          time = Math.floor( time / 1000 );

          setTimer(index, time);

          $(this).closest(".dropdown-item, button").addClass("paused");

          pause(index);

        }

        else if ( timer["running"] == false ) {

          reset(index);
          
        }

        $(this).closest(".dropdown-item, button").prop("title", setTitle(timer));

      });

      $("#sum").prop("title", setTitle(timers[0]));

      // #displayed1 title
      setTimeout( () => {

        var task  = $("#displayed1").html().split("&nbsp;")[0].replace("&amp;", "&").trim();
        var title = $(".dropdown-item[data-name='" + task + "']").prop("title");

        $("#displayed1").prop("title", title);

      }, 1000);

      if ( $(".toissa .running").length ) {

        $("#displayed1, #arrow1").removeClass("btn-success").addClass("btn-dark");

        if ( $(".dropdown-item[data-name=Töissä]").hasClass("running") ) 
          $(".dropdown-item[data-name=Yhteensä]").css("background-color", green);
        else
          $(".dropdown-item[data-name=Yhteensä]").css("background-color", "grey");

      }

      else {
  
        $("#displayed1, #arrow1").removeClass("btn-dark").addClass("btn-success");

        if ( $(".toissa .paused").length ) 
          $(".dropdown-item[data-name=Yhteensä]").css("background-color", yellow);

        // Display task that was last paused
        var pauseStartTimes = timers.map( timer => timer.pauseStartTime );

        var pauseStartTimes_copy = pauseStartTimes;
        pauseStartTimes_copy.pop();
        pauseStartTimes_copy = pauseStartTimes_copy.filter( pauseStartTimes_copy => pauseStartTimes_copy != 0 );

        var maxDiff;

        if ( pauseStartTimes_copy.length > 1 )
          maxDiff = Math.max(...pauseStartTimes_copy) - Math.min(...pauseStartTimes_copy);
        else
          maxDiff = -1;

        var i;

        // After edit
        if ( maxDiff >= 0 && maxDiff <= 100 ) {
          i = pauseStartTimes.indexOf( pauseStartTimes_copy[0] );
        }
        else {
          i = pauseStartTimes.indexOf( Math.max(...pauseStartTimes) );
          // If lunch
          if ( i == ( pauseStartTimes.length - 1 ) )
            i = pauseStartTimes.indexOf( secondMax(pauseStartTimes) );
        }
      
        setTimeout( () => {

          var last_paused = $(".toissa .dropdown-item").not("#sum").eq(i);

          var html;
          var name;

          if ( !$(".toissa .running").length && !$(".toissa .paused").length ) {
            html = "Töissä" + "&nbsp;&nbsp;&nbsp;" + "00:00:00";
            $("#displayed1").html(html);
            return;
          }
          
          if ( i == 0 ) {
            html = $("#sum").html();
            html = html.replace("<", "&nbsp;&nbsp;&nbsp;<");
            $("#displayed1").html(html);
            return;
          }

          html = last_paused.html();
          name = html.split("<")[0];
          
          html = html.replace(name, last_paused.data("name") + "&nbsp;&nbsp;&nbsp;");

          $("#displayed1").html(html);
          
        }, 600);
        
      }

      $(".toissa .running").css("background-color", green);
      $(".toissa .paused").css("background-color", yellow);

      if ( $(".lounastauko").hasClass("running") )
        $(".lounastauko").removeClass("btn-warning").addClass("btn-dark");
      else if ( $(".lounastauko").hasClass("paused") )
        $(".lounastauko").removeClass("btn-dark").addClass("btn-warning");

      // Sum
      setTimeout( function () {

        sum = 0;

        $(".toissa .time").not(":first, #liukumavahennys .time").each( function () {
          time = $(this).text();
          sum += hms_to_s(time);
        })

        sum = s_to_hms(sum);

        $("#sum").find(".time").text(sum);

      }, 500)

      // Click events

      // Töissä & lounastauko
      $("#displayed1").click( function() {
        
        var task = $(this).html().split("&nbsp;")[0].trim().replace("&amp;", "&");

        if ( task == "Töissä" )
          task = "Yhteensä";

        $(".dropdown-item[data-name='" + task + "']").click();

      });

      $("#arrow1").click( function() {

        $(".toissa").css("margin-left", "-" + $("#displayed1").css("width"));

      })

      $(".toissa .dropdown-item, .lounastauko").click( function () {

        var index_this;

        if ( $(this).data("name") == "Yhteensä" ) {
          index_this = $(".toissa .dropdown-item, .lounastauko").index(this);
        } else {
          index_this = $(".toissa .dropdown-item, .lounastauko").not("#sum").index(this);
        }

        var index_prev_running = $(".toissa .dropdown-item, .lounastauko").not("#sum").index($(".running"));

        if ( index_prev_running != -1 && index_this != index_prev_running ) {
          changeState(index_prev_running);
        }
        
        changeState(index_this);

        // Update #displayed1, #sum title
        setTimeout( () => {

          // #displayed1
          var task  = $("#displayed1").html().split("&nbsp;")[0].replace("&amp;", "&");
          var title = $(".dropdown-item[data-name='" + task + "']").prop("title");
          $("#displayed1").prop("title", title);
  
          // #sum
          task  = "Töissä";
          title = $(".dropdown-item[data-name='" + task + "']").prop("title");
          $("#sum").prop("title", title);
  
        }, 1000);

        timers.push(poissa_sairas_loma);
        $("#save_timers").load("save_timers.php?name=" + user_ + "&date=" + getDate() + "&timers=" + JSON.stringify(timers));
        timers.pop();
        
      });

      // Poissa

      $("#displayed2").click( function() {

        var selection = $(this).text().split(" ")[0];

        $(".dropdown-item[data-name=" + selection + "]").click();

      });
      
      $("#arrow2").click( function() {

        $(".poissa").css("margin-left", "-" + $("#displayed2").css("width"));
      
      });

      $(".poissa .dropdown-item").click( function() {

        var selection = $(this).text().trim().split(" ")[0];

        $("#displayed2").text(selection);

        $(".on").not(this).removeClass("on");
        $(this).toggleClass("on");

        $(".poissa .dropdown-item").css("background-color", "white");
        $(".on").css("background-color", green);

        if ( $(".on").length ) {

          $("#displayed1, #arrow1, .lounastauko").prop("disabled", true);

          if ( $(".toissa .running").length )
            $("#displayed1").click();
          if ( $(".lounastauko").hasClass("running") )
            $(".lounastauko").click();

          $("#displayed2, #arrow2").removeClass("btn-danger").addClass("btn-dark");

        }

        else {

          $("#displayed1, #arrow1, .lounastauko").prop("disabled", false);
          $("#displayed2, #arrow2").removeClass("btn-dark").addClass("btn-danger");
          
        }

        poissa_sairas_loma["poissa"] = $(".dropdown-item[data-name=Poissa]").hasClass("on") ? 1 : 0;
        poissa_sairas_loma["sairas"] = $(".dropdown-item[data-name=Sairas]").hasClass("on") ? 1 : 0;
        poissa_sairas_loma["loma"]   = $(".dropdown-item[data-name=Loma]").hasClass("on")   ? 1 : 0;

        timers.push(poissa_sairas_loma);
        $("#save_timers").load("save_timers.php?name=" + user_ + "&date=" + getDate() + "&timers=" + JSON.stringify(timers));
        timers.pop();

      });

      // Initiate
      if ( poissa_sairas_loma["poissa"] == 1 || poissa_sairas_loma["sairas"] == 1 || poissa_sairas_loma["loma"] == 1 ) {

        if ( poissa_sairas_loma["poissa"] == 1 )
          $(".dropdown-item[data-name=Poissa]").click();
        if ( poissa_sairas_loma["sairas"] == 1 )
          $(".dropdown-item[data-name=Sairas]").click();
        if ( poissa_sairas_loma["loma"] == 1 )
          $(".dropdown-item[data-name=Loma]").click();

      }

      // Cancel
      $("#cancel").click( function () {

        if ( confirm("Haluatko varmasti peruuttaa ja poistaa päivän tiedot?") ) {

          $("#delete_entry").load("delete_entry.php?name=" + user_ + "&date=" + getDate(), function() {
            window.location.href = "login.html";
          });

        }

      });

      // Stats
      $("#stats").click( function () {
        window.location.href = "stats.html?userID=" + userID + "&person=1" + "&day=" + day_today + "&month=" + month_today + "&year=" + year_today + "&edit=" + "&uniqueID=" + uniqueID;
      });

      // Save
      $("#save").click( function () {

        user_ = user_.replace(/ä/g, "replacethis");

        // Query string
        var queryString = "name=" + user_ + "&date=" + getDate();

        // Tasks
        var tasks = $(".toissa .dropdown-item, .lounastauko").not("#sum");

        tasks.each( function () {

          task = $(this);

          if ( task.hasClass("running") )
            task.click();
          
          var task_name = task.data("name");
              task_name = asQueryParameter(task_name);

          var time = task.find(".time").text();
              time = hms_to_s(time);

          queryString += "&" + task_name + "=" + time;
          
        });

        var poissa = $(".dropdown-item[data-name=Poissa]").hasClass("on") ? 1 : 0;
        var sairas = $(".dropdown-item[data-name=Sairas]").hasClass("on") ? 1 : 0;
        var loma   = $(".dropdown-item[data-name=Loma]").hasClass("on")   ? 1 : 0;

        queryString += "&poissa=" + poissa + "&sairas=" + sairas + "&loma=" + loma;

        // Update data
        $("#update_data").load("update_data.php?" + queryString, function() {
          window.location.href = "stats.html?userID=" + userID + "&person=1" + "&day=" + day_today + "&month=" + month_today + "&year=" + year_today + "&edit=" + "&uniqueID=" + uniqueID;
        });

      });

    });

  });

});