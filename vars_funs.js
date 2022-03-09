// Variables
var kaikki_kohteet_index = ["Yhteensä", "Töissä", "Tietojärjestelmät - Kehitys", "Tietojärjestelmät - Tuki", "LOVe - Ylläpito", "LOVe - Tuki", "LOVe - Sisällöntuotanto", "Muut verkkokurssit - Tuki", "Muut verkkokurssit - Ylläpito", "Muut verkkokurssit - Sisällöntuotanto", "Muut tuotteet - Kehitys", "Muut tuotteet - Tuki", "Yhteiset työkalut", "Testaus", "Nettisivut", "Verkkoinfrastruktuuri", "Microsoft 365", "Ruotsinnos", "LAS-ruotsinnos", "GER-ruotsinnos", "NÄYTTÖ", "PSYK", "SYTO", "Sopimukset & tarjoukset", "Sisäinen viestintä", "Sisäiset palaverit", "Asiakasviestintä", "Asiakaspalaverit", "Koulutukset", "Koulutusten valmistelu", "Taloushallinto", "Hallinnointipalvelut", "Henkilöstöhallinto", "Laatutyö", "Laskutettava tuntityö", "Työmatkat", "Happihyppely", "Palkallinen poissaolo", "Liukumavähennys"];
var kaikki_kohteet_stats = ["Töissä", "Tietojärjestelmät - Kehitys", "Tietojärjestelmät - Tuki", "LOVe - Ylläpito", "LOVe - Tuki", "LOVe - Sisällöntuotanto", "Muut verkkokurssit - Tuki", "Muut verkkokurssit - Ylläpito", "Muut verkkokurssit - Sisällöntuotanto", "Muut tuotteet - Kehitys", "Muut tuotteet - Tuki", "Yhteiset työkalut", "Testaus", "Nettisivut", "Verkkoinfrastruktuuri", "Microsoft 365", "Ruotsinnos", "LAS-ruotsinnos", "GER-ruotsinnos", "NÄYTTÖ", "PSYK", "SYTO", "Sopimukset & tarjoukset", "Sisäinen viestintä", "Sisäiset palaverit", "Asiakasviestintä", "Asiakaspalaverit", "Koulutukset", "Koulutusten valmistelu", "Taloushallinto", "Hallinnointipalvelut", "Henkilöstöhallinto", "Laatutyö", "Laskutettava tuntityö", "Työmatkat", "Happihyppely", "Palkallinen poissaolo", "Liukumavähennys"];

var tyontekijat          = ["Roope Anttila", "Valtteri Anttila", "Heli Haavisto", "Elina Hanslian", "Mirelle Kangas", "Otto Kontio", "Simo Korpela", "Eeli Kuosmanen", "Tuukka Monto", "Elisa Mäkinen", "Riikka Panu", "Hillevi Rautiainen", "Oskari Riihimäki", "Heli Rokkonen", "Emma Ruotsalainen", "Jaakko Saano", "Kaisa Saano", "Susanna Saano", "Jarkko Wallenius"];
var tuntipalkalliset     = ["Roope Anttila", "Heli Haavisto", "Elina Hanslian", "Simo Korpela", "Eeli Kuosmanen", "Tuukka Monto", "Elisa Mäkinen", "Riikka Panu", "Hillevi Rautiainen", "Oskari Riihimäki", "Emma Ruotsalainen", "Jaakko Saano", "Kaisa Saano", "Susanna Saano"];
var kuukausipalkalliset  = tyontekijat.filter( tyontekija => !tuntipalkalliset.includes(tyontekija) );

var userID               = getUrlParameter("userID");
var userID2              = getUrlParameter("userID2");
var person               = getUrlParameter("person");
var day                  = getUrlParameter("day");
var month                = getUrlParameter("month");
var year                 = getUrlParameter("year");
var edit                 = getUrlParameter("edit");
var salary_period        = getUrlParameter("salary_period");

var userIDs              = ["594585", "3358000", "1719150", "2294025", "1776090", "2420680", "928560", "2565585", "2353520", "3300695", "113515", "815775", "3559115", "913230", "2913065", "2815245"];

var user                 = getName(userID);
var user_                = getName(userID, "_");

var user2                = getName(userID2);
var user2_               = getName(userID2, "_");

var day_today            = new Date().getDate();
var month_today          = new Date().getMonth() + 1;
var year_today           = new Date().getFullYear();

var holidays_2021        = ["1.1.2021", "6.1.2021", "2.4.2021", "5.4.2021", "1.5.2021", "13.5.2021", "25.6.2021", "26.6.2021", "6.12.2021", "24.12.2021", "25.12.2021", "26.12.2021"];
var holidays_2022        = ["6.1.2022", "15.4.2022", "18.4.2022", "26.5.2022", "6.12.2022", "26.12.2022"];
var holidays             = holidays_2021.concat(holidays_2022);
    holidays             = holidays.map( date => asDate(date) ).map( date => date.getTime() );

var uniqueID             = new Date().getTime();

var green                = "#28a745";
var yellow               = "#ffc107";

var users = { 
  "594585"  : "Roope Anttila",
  "3358000" : "Valtteri Anttila",
  "1719150" : "Heli Haavisto",
  "2294025" : "Elina Hanslian",
  "1776090" : "Mirelle Kangas",
  "2420680" : "Otto Kontio",
  "928560"  : "Simo Korpela",
  "2565585" : "Eeli Kuosmanen",
  "2353520" : "Tuukka Monto",
  "3300695" : "Elisa Mäkinen",
  "113515"  : "Riikka Panu",
  "815775"  : "Oskari Riihimäki",
  "3559115" : "Heli Rokkonen",
  "913230"  : "Emma Ruotsalainen",
  "2913065" : "Jaakko Saano",
  "2815245" : "Jarkko Wallenius"
};

// Functions
function getName( userID, underscore = "" ) {

  var users = { 
    "594585"  : "Roope Anttila",
    "3358000" : "Valtteri Anttila",
    "1719150" : "Heli Haavisto",
    "2294025" : "Elina Hanslian",
    "1776090" : "Mirelle Kangas",
    "2420680" : "Otto Kontio",
    "928560"  : "Simo Korpela",
    "2565585" : "Eeli Kuosmanen",
    "2353520" : "Tuukka Monto",
    "3300695" : "Elisa Mäkinen",
    "113515"  : "Riikka Panu",
    "815775"  : "Oskari Riihimäki",
    "3559115" : "Heli Rokkonen",
    "913230"  : "Emma Ruotsalainen",
    "2913065" : "Jaakko Saano",
    "2815245" : "Jarkko Wallenius"
  };

  var name = userID != "" ? users[userID] : "";

  if ( underscore == "_" )
    name = name.replace(" ", "_");

  return name;

}

function getDate() {

  return day_today + "." + month_today + "." + year_today;

}

function kuukausipalkallinen(user) {

  return kuukausipalkalliset.includes(user);

}

function tuntityontekija(user) {

  return !kuukausipalkalliset.includes(user);

}

function getUrlParameter(param) {

  var queryString = window.location.search.substring(1);
  var queries     = queryString.split("&");
  var key, value, i;

  for ( i = 0; i < queries.length; i++ ) {

    key_value = queries[i].split("=");

    key   = key_value[0];
    value = key_value[1];

    if ( key == param ) {
      return value;
    }

  }

  return "";

};

function asQueryParameter(input) {
  return input.toLowerCase().replace(/<br>/g, "").replace(/ä/g, "a").replace(/ö/g, "o").replace(/\W+/g, "_").replace(/tietojarjestelmat/g, "tj");
}

function isNumeric(str) {

  if ( typeof str != "string" )
    return false;

  return !isNaN(str) && !isNaN( parseFloat(str) );

}

function s_to_hms(input) {

  if ( input == 0 )
    return "00:00:00";

  var h = Math.floor( input / 3600 ); 
  var m = Math.floor( ( input - 3600 * h ) / 60 );
  var s = input - 3600 * h - 60 * m;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  
  return h + ":" + m + ":" + s;

}

function hms_to_s(input) {

  if ( input == "00:00:00" )
    return 0;

  var hms = input.split(":");

  var h = parseInt(hms[0]);
  var m = parseInt(hms[1]);
  var s = parseInt(hms[2]);

  return 3600 * h + 60 * m + 1 * s;

}

function time_to_hms(time) {

  if ( time == 0 ) 
    return "00:00:00";

  var time = new Date(time);

  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return h + ":" + m + ":" + s;

}

function setTitle(timer) {

  var aloitusaika          = time_to_hms( timer["startTime"] );
  var edellinen_kaynnistys = time_to_hms( timer["lastStartTime"] );
  var edellinen_tauko      = time_to_hms( timer["pauseStartTime"] );

  var output = "";

  output += "Aloitusaika: " + aloitusaika;
  output += " --- ";
  output += "Edellinen käynnistys: " + edellinen_kaynnistys;
  output += " --- ";
  output += "Edellinen tauko: " + edellinen_tauko;

  return output;

}

function naytaKohteet_index(kohteet) {

  var piilota_kohteet = kaikki_kohteet_index.filter( kohde => !kohteet.includes(kohde) );

  for ( var i = 0; i < piilota_kohteet.length; i++ ) {
    var kohde = piilota_kohteet[i];
    $(".dropdown-item[data-name='" + kohde + "']").css("display", "none");
  }

  function hide_headers_dividers(value) {

    var $element = $(".dropdown-item[data-name='" + value + "']");

    if ( $element.css("display") == "none" ) {
      if ( $element.prev().hasClass("dropdown-header") || $element.prev().hasClass("dropdown-divider") )
        $element.prev().css("display", "none");
      if ( $element.prev().prev().hasClass("dropdown-header") || $element.prev().prev().hasClass("dropdown-divider") )
        $element.prev().prev().css("display", "none");
    }   

  }
  
  var arr = ["Tietojärjestelmät - Kehitys", "LOVe - Ylläpito", "Muut verkkokurssit - Ylläpito", "Muut tuotteet - Kehitys", "Palkallinen poissaolo"];

  arr.forEach(hide_headers_dividers);

}

function naytaKohteet_stats(kohteet) {
  
  for ( var i = 0; i < kohteet.length; i++ ) {
    var element = "#tyokohde" + (i + 1);
    var kohde = kohteet[i];
    $(element).find("h3").text(kohde);
  }

  var piilota_kohteet = kaikki_kohteet_stats.filter( kohde => !kohteet.includes(kohde) );

  for ( var i = 0; i < piilota_kohteet.length; i++ ) {
    var element = "#tyokohde" + ( kohteet.length + i + 1 );
    var kohde = piilota_kohteet[i];
    $(element).hide().find("h3").text(kohde);
  }

  if ( tuntityontekija(user) ) {
    $("#liukumavahennys").parent().css("display", "none");
    $("#lounastauko").parent().removeClass("col-sm-6").addClass("col-sm-12");
  }
  
  $("#liukumavahennys").find("h3").text("Liukumavähennys");
  $("#lounastauko").find("h3").text("Lounastauko");

}

function naytaKaikkienKohteet_index() {

  if ( user == "Roope Anttila" ) {
    
    naytaKohteet_index([
      "Yhteensä",
	    "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
	    "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Microsoft 365",
      "Verkkoinfrastruktuuri",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Hallinnointipalvelut",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Valtteri Anttila" ) {

    naytaKohteet_index([
       "Yhteensä",
	     "LOVe - Ylläpito",
	     "LOVe - Tuki",
       "LOVe - Sisällöntuotanto",
       "Muut verkkokurssit - Ylläpito",
	     "Muut verkkokurssit - Tuki",
       "Muut verkkokurssit - Sisällöntuotanto",
       "Muut tuotteet - Kehitys",
	     "Muut tuotteet - Tuki",       
       "Yhteiset työkalut",
       "Testaus",
       "Nettisivut",
       "Verkkoinfrastruktuuri",
       "Sopimukset & tarjoukset",
       "Sisäinen viestintä",
       "Sisäiset palaverit",
       "Asiakaspalaverit",
       "Hallinnointipalvelut",
       "Happihyppely",
       "Palkallinen poissaolo",
       "Liukumavähennys"
    ]);

  }

  else if ( user == "Heli Haavisto" ) {
    
    naytaKohteet_index([
      "Yhteensä",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
	    "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Ruotsinnos",
      "NÄYTTÖ",
      "PSYK",
      "SYTO",
      "Yhteiset työkalut",
      "Nettisivut",  
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Hallinnointipalvelut",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Elina Hanslian" ) {

    naytaKohteet_index([
      "Yhteensä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sopimukset & tarjoukset",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Koulutukset",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Mirelle Kangas" ) {
    
    naytaKohteet_index([
      "Yhteensä",
	    "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Taloushallinto",
      "Laskutettava tuntityö",
      "Happihyppely",
      "Palkallinen poissaolo",
      "Liukumavähennys"
    ]);

  }
  
  else if ( user == "Otto Kontio" ) {
  
    naytaKohteet_index([
      "Yhteensä",
	    "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",                
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Happihyppely",
      "Palkallinen poissaolo",
      "Liukumavähennys"
    ]);

  }

  else if ( user == "Simo Korpela" ) {
    
    naytaKohteet_index([
      "Yhteensä",
      "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",          
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Eeli Kuosmanen" ) {

    naytaKohteet_index([
	    "Yhteensä",
      "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sopimukset & tarjoukset",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Tuukka Monto" ) {

    naytaKohteet_index([
      "Yhteensä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit",
      "Palkallinen poissaolo"
    ]);
    
  }

  else if ( user == "Elisa Mäkinen" ) {

    naytaKohteet_index([
      "Yhteensä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);
    
  }

  else if ( user == "Riikka Panu" ) {

    naytaKohteet_index([
      "Yhteensä",
	    "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }
  
  else if ( user == "Oskari Riihimäki" ) {

    naytaKohteet_index([
      "Yhteensä",
	    "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
  	  "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Tuki",
      "Muut tuotteet - Kehitys",
      "Yhteiset työkalut",
      "Testaus",
      "Sisäiset palaverit",
      "Happihyppely",
      "Palkallinen poissaolo",
      "Liukumavähennys"
   ]);

  }
  
  else if ( user == "Heli Rokkonen" ) {
    
    naytaKohteet_index([
	    "Yhteensä",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
	    "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
  	  "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Hallinnointipalvelut",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Työmatkat",
      "Happihyppely",
      "Palkallinen poissaolo",
      "Liukumavähennys"
    ]);

  } 

  else if ( user == "Emma Ruotsalainen" ) {

    naytaKohteet_index([
      "Yhteensä",
      "Sisäiset palaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);
    
  }
  
  else if ( user == "Jaakko Saano" ) {

    naytaKohteet_index([
      "Yhteensä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit"
    ]);
    
  }
    
  else if ( user == "Jarkko Wallenius" ) {

    naytaKohteet_index([
	    "Yhteensä",
      "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
	    "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
	    "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Verkkoinfrastruktuuri", 
      "Microsoft 365",
      "Ruotsinnos",
      "LAS-ruotsinnos",
      "GER-ruotsinnos",
      "NÄYTTÖ",
      "PSYK",
      "SYTO",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Hallinnointipalvelut",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Laskutettava tuntityö",
      "Työmatkat",
      "Happihyppely",
      "Palkallinen poissaolo",
      "Liukumavähennys"
    ]);

  }

}

function naytaKaikkienKohteet_stats() {

  if ( user == "Roope Anttila" ) {
    
    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Microsoft 365",
      "Verkkoinfrastruktuuri",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Hallinnointipalvelut",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Valtteri Anttila" ) {

    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Verkkoinfrastruktuuri",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Hallinnointipalvelut",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Heli Haavisto" ) {
    
    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Yhteiset työkalut",
      "Nettisivut",
      "Ruotsinnos",
      "LAS-ruotsinnos",
      "GER-ruotsinnos",
      "NÄYTTÖ",
      "PSYK",
      "SYTO",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Hallinnointipalvelut",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Elina Hanslian" ) {

    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sopimukset & tarjoukset",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Koulutukset",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Mirelle Kangas" ) {
    
    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Taloushallinto",
      "Laskutettava tuntityö",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }
  
  else if ( user == "Otto Kontio" ) {
  
    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",                
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Simo Korpela" ) {
    
    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",          
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Eeli Kuosmanen" ) {

    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
	    "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
	    "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sopimukset & tarjoukset",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Tuukka Monto" ) {

    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit",
      "Palkallinen poissaolo"
    ]);
    
  }

  else if ( user == "Elisa Mäkinen" ) {

    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);
    
  }

  else if ( user == "Riikka Panu" ) {

    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Oskari Riihimäki" ) {

    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sisäiset palaverit",
      "Happihyppely",
      "Palkallinen poissaolo"
   ]);

  }

  else if ( user == "Heli Rokkonen" ) {
    
    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",      
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Hallinnointipalvelut",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Työmatkat",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

  else if ( user == "Emma Ruotsalainen" ) {

    naytaKohteet_stats([
      "Töissä",
      "Sisäiset palaverit",
      "Taloushallinto",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);
    
  }

  else if ( user == "Jaakko Saano" ) {

    naytaKohteet_stats([
      "Töissä",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Sisäiset palaverit"
    ]);
    
  }
  
  else if ( user == "Jarkko Wallenius" ) {

    naytaKohteet_stats([
      "Töissä",
      "Tietojärjestelmät - Kehitys",
      "Tietojärjestelmät - Tuki",
      "LOVe - Ylläpito",
      "LOVe - Tuki",
      "LOVe - Sisällöntuotanto",
      "Muut verkkokurssit - Ylläpito",
      "Muut verkkokurssit - Tuki",
      "Muut verkkokurssit - Sisällöntuotanto",
      "Muut tuotteet - Kehitys",
      "Muut tuotteet - Tuki",
      "Yhteiset työkalut",
      "Testaus",
      "Nettisivut",
      "Verkkoinfrastruktuuri", 
      "Microsoft 365",
      "Ruotsinnos",
      "LAS-ruotsinnos",
      "GER-ruotsinnos",
      "NÄYTTÖ",
      "PSYK",
      "SYTO",
      "Sopimukset & tarjoukset",
      "Sisäinen viestintä",
      "Sisäiset palaverit",
      "Asiakasviestintä",
      "Asiakaspalaverit",
      "Koulutukset",
      "Koulutusten valmistelu",
      "Taloushallinto",
      "Hallinnointipalvelut",
      "Henkilöstöhallinto",
      "Laatutyö",
      "Laskutettava tuntityö",
      "Työmatkat",
      "Happihyppely",
      "Palkallinen poissaolo"
    ]);

  }

}

// https://gist.github.com/ScottKaye/5158488#file-hide-url-parameters-js
function hideURLParams() {
  
  function getUrlParameter2(name) {
    return decodeURI((RegExp(name + "=" + "(.+?)(&|$)").exec(location.search)||[,null])[1]);
  }

  var hide = ["userID", "person", "day", "month", "year", "edit", "uniqueID"];
  
	for ( var h in hide )
		if ( getUrlParameter2(h) ) 
			history.replaceState(null, document.getElementsByTagName("title")[0].innerHTML, window.location.pathname);
	
}

function isDateObject(date) {
  return typeof date.getMonth === 'function';
}

function isValidDate(date) {

  var date = date;

  if ( !isDateObject(date) )
    date = date.split(".");
  
  var day   = date[0];
  var month = date[1];
  var year  = date[2];
  
  date = new Date(year, +month - 1, day);
  
  if ( day != date.getDate() )
    return false;
    
  if ( month != date.getMonth() + 1 )
    return false;
    
  if ( year != date.getFullYear() )
    return false;
    
  return true;

}

function asDate(date) {

  var date = date.split(".");
  
  var thisDay   = date[0];
  var thisMonth = +date[1] - 1;
  var thisYear  = date[2];
  
  date = new Date(thisYear, thisMonth, thisDay);
  
  return date;
  
}

function getDates(start, end) {

  var start = asDate(start);
  var end   = asDate(end);

  var arr = new Array();
  var dt  = new Date(start);

  while ( dt <= end ) {
    arr.push( new Date(dt) );
    dt.setDate( dt.getDate() + 1 );
  }

  return arr;

}

function isWeekend(day) {

  var dayOfWeek = day.getDay();
  var isWeekend = dayOfWeek == 6 || dayOfWeek == 0;

  return isWeekend;

}

function isHoliday(day) {

  var day = day.getTime();

  return holidays.includes(day);

}

function notifyNeeded(timers) {

  var tyotehtavat = timers.slice(0, -1); 
  var lounastauko = timers[timers.length - 1];

  if ( tyotehtavat.filter( timer => timer.running == true ).length ) {
    var timeOn = Date.now() - tyotehtavat.filter( timer => timer.running == true ).map( timer => timer.startTime + timer.pauseLength );
    return timeOn >= 2 * 3600 * 1000;
  } else {
    var timeOn = Date.now() - ( lounastauko.startTime + lounastauko.pauseLength );
    return timeOn >= 0.5 * 3600 * 1000;
  }
    
}

function secondMax(arr) {

  var max       = Math.max( ...arr );
  var max_i     = arr.indexOf(max);

  arr[max_i]    = -Infinity;

  var secondMax = Math.max( ...arr );
  arr[max_i]    = max;

  return secondMax;

};

function showNotification() {
  var notification = new Notification("Työajanseuranta", {
     body: "Tarkista ajastimet",
     icon: "clock.png"
  })
}

setTimeout( () => {
  hideURLParams();
}, 500);