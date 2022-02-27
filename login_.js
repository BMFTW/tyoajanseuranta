$(document).ready( function() {

  // Validate login
  $("#login").click( function() {

    if ( ( $("#email").val() == "roope.anttila@awanic.fi"     && $("#pwd").val() == "1629" ) ||
         ( $("#email").val() == "valtteri.anttila@awanic.fi"  && $("#pwd").val() == "9200" ) ||     
         ( $("#email").val() == "heli.haavisto@awanic.fi"     && $("#pwd").val() == "4710" ) ||
         ( $("#email").val() == "elina.hanslian@awanic.fi"    && $("#pwd").val() == "6285" ) ||
         ( $("#email").val() == "mirelle.kangas@awanic.fi"    && $("#pwd").val() == "4866" ) ||
         ( $("#email").val() == "otto.kontio@awanic.fi"       && $("#pwd").val() == "6632" ) ||
         ( $("#email").val() == "simo.korpela@awanic.fi"      && $("#pwd").val() == "2544" ) ||
         ( $("#email").val() == "eeli.kuosmanen@awanic.fi"    && $("#pwd").val() == "7029" ) ||
         ( $("#email").val() == "tuukka.monto@awanic.fi"      && $("#pwd").val() == "6448" ) ||
         ( $("#email").val() == "elisa.makinen@awanic.fi"     && $("#pwd").val() == "9043" ) ||
         ( $("#email").val() == "riikka.panu@awanic.fi"       && $("#pwd").val() == "0311" ) ||
         ( $("#email").val() == "oskari.riihimaki@awanic.fi"  && $("#pwd").val() == "2235" ) ||
         ( $("#email").val() == "heli.rokkonen@awanic.fi"     && $("#pwd").val() == "9751" ) ||
         ( $("#email").val() == "emma.ruotsalainen@awanic.fi" && $("#pwd").val() == "2502" ) ||
         ( $("#email").val() == "jaakko.saano@awanic.fi"      && $("#pwd").val() == "7981" ) ||
         ( $("#email").val() == "jarkko.wallenius@awanic.fi"  && $("#pwd").val() == "7713" ) ) {

      var userID = parseInt($("#pwd").val()) * 365;

      $.getScript("vars_funs.js", function () {
        window.location.href = "index.html" + "?userID=" + userID + "&uniqueID=" + uniqueID;
      });
      
      return false;

    } else {

      $(this).removeClass("btn-success").addClass("btn-danger");
      return false;

    }

  });

});