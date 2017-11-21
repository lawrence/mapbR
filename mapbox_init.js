// (F) newMap: Creates a new map backdrop on HTML page. Only for initializing.
function newMap(lat, long, zoom_num, aToken){
  mapboxgl.accessToken = aToken;

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [long, lat],
    zoom: zoom_num
  });
}

// (F) loapMap: Creates a new map based on user given input. This code is slighly modified from MapBox in order to make it more user customizable using MapBr.
function loadMap(mapid, mapurl, maplayer, mapprop, t_unit, t_split){
  mapboxgl.accessToken = $("#a_token").val();

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [$("#lon_input").val(), $("#lat_input").val()],
    zoom: $("#zoom_input").val()
  });

  map.on('load', function () {
    map.addLayer({
      'id': mapid,
      'type': 'circle',
      'source': {
        type: 'vector',
        url: mapurl
      },
      'source-layer': maplayer,
      'paint': {
        'circle-color': {
          property: mapprop,
          type: 'interval',
          stops: colorList
        },

        "circle-radius": {
          "property": mapprop,
          "stops": [
            [1, 5],
            [2, 10],
            [3, 15],
            [4, 20],
            [5, 25],
            [6, 30],
            [7, 45],
            [8, 50],
            [9, 55],
            [10, 60],
          ]
        },
        'circle-opacity': 0.9
      }
    });

    // Starting filter for the graph:
    map.setFilter(mapid, ['==', 'time', "12:00:00"]);

    // Filter for every minute or seconds for data plots saved from Mapbox made map:
    document.getElementById('newSlider').addEventListener('input', function(e) {
      var val = parseFloat(e.target.value);

      if (t_unit == "seconds"){
        var cHMS = seconds2HMS(val);
        map.setFilter(mapid, ['==', 'time', cHMS]);
        document.getElementById('active-time').innerText = cHMS;
        //console.log('seconds ' + val);
      }

      if (t_unit == "minutes"){
        var cHMS = minutes2HMS(val);
        map.setFilter(mapid, ['==', 'time', cHMS]);
        document.getElementById('active-time').innerText = cHMS;
        //console.log('minutes ' + val);
      }
    });

    // Popup box on click function below:
    map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: [mapid] });

      if (!features.length) {
        return;
      }

      var feature = features[0];
      var popup = new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<div id="popup" class="popup" style="z-index: 10;"> <h1> Detail: </h1>' +
      '<ul class="list-group">' +
      '<li class="list-group-item"> Time: ' + feature.properties['time'] + " </li>" +
      '<li class="list-group-item"> Occurrence Count: ' + feature.properties[mapprop] + " </li>" + '</ul> </div>')
      .addTo(map);
    });

    // Hover over property viewer:
    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: [mapid] });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
  });
}

// (F) getVariables: Scraping init page for variables and placing them into the right functions to print out user MapBox data.
function getVariables(){

  // Error handling on blank form:
  if($("input").val() == ""){
    alert("You have to fill out the form!");
    return;
  }

  else {
    // Creates map from new_map.js as new_map.html
    $("#console").load("new_map.html");

    // JQuery .load() function's CSS keeps getting overloaded with Bootstrap's .less files. Quick style tags to fix it.
    $('head').append('<style> .row { margin-right: initial; margin-left: initial; } h1 { font-size: initial; } h2 { font-size: initial; } </style>');

    // Loads and centers the map backdrop:
    loadMap($("#map_url").val(),$("#map_url").val(),$("#s_layer").val(),$("#prop").val(),$("#time_unit").val(),$("#time_value").val());

    // Creating input minutes or seconds filter for map:
    if(!isNaN(parseInt($("#time_value").val()))){

      // For minutes!
      if($("#time_unit").val() == "minutes"){
        var time_unit = $("#time_unit").val();

        console.log("MINS");
        //var input_val = "<input id='newSlider' class='row' type='range' range='min' min='0' max='1439' step='" + time_unit + "'/>";

        $("#newSlider").attr('max','1439');
        $("#newSlider").attr('step',time_unit);

        //$("#newSlider").load(input_val);
      }

      // For seconds! (only two options available...)
      else {
        var time_unit = $("#time_unit").val();
        var input_val = "<input id='newSlider' class='row' type='range' range='min' min='0' max='86399' step='" + time_unit + "'/>";
        $("#newSlider").load(input_val);
      }
    }

    else {
      //alert(isNaN(parseInt($("#time_value").val())));
      alert("You didn't specify a time unit split that is divisible by seconds or minutes! Default slider will show every second of the day.");
    }

    // Loads and centers the map backdrop:
    loadMap($("#map_url").val(),$("#map_url").val(),$("#s_layer").val(),$("#prop").val(),$("#time_unit").val(),$("#time_value").val());
  }
}

// (F) tutorialLoad: Loads tutorial and example HTML on tutorial button click.
function tutorialLoad(){
  $("#console").load("tutorial.html");
}

// (F) mainMenu: button to make console revert back to landing menu
function mainMenu(){
  $("#console").load('menu.html');
  // Fixing past head style append from getVariables().
  $('head').append('<style> h1 { font-size: 36px; } </style>');
}

// (F) hideConsole: Hide most of console for viewability.
function hideConsole(){
  $("#content-main").hide();
  $("#showButton").show();
  $(".col-sm-4").css("height","0px");
  $("#console").css("opacity","0.75");
  $("#console").css("width","95px");
}

// (F) showConsole: Restore console back to normal.
function showConsole(){
  $("#showButton").hide()
  $(".col-sm-4").css("height","10px");
  $("#console").css("opacity","1");
  $("#console").css("width","300px");
  $("#content-main").show();
}

// Table of colors for occurence heat colors.
var colorList = [
  [1, '#F8DE5F'],
  [2, '#FAD35B'],
  [3, '#FBC759'],
  [4, '#FBBC58'],
  [5, '#FAB158'],
  [6, '#F8A659'],
  [7, '#F59C5B'],
  [8, '#F0925D'],
  [9, '#EA8960'],
  [10, '#E48062']
];

// (F) minutes2HMS: creating conversions b/w minutes to HMS format.
function minutes2HMS(input_minute){
  var min_num = parseInt(input_minute, 10);
  var hours = Math.floor(min_num / 60);
  var minutes = Math.floor((min_num - (hours * 60)) / 60);
  var seconds = min_num - (hours * 60) - (minutes * 60);

  // Formatting in case numbers need a 0 below 10.
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+seconds+':'+minutes;
}

// (F) seconds2HMS: creating conversions b/w seconds to HMS format.
function seconds2HMS(input_second) {
    var sec_num = parseInt(input_second, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    // Formatting in case numbers need a 0 below 10.
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

// --- Below are initializers for the HTML page: --- //

// Initial default map called for aesthetics, encapsulated into a function so that the initializer is only ran once:
var defaultToken = "pk.eyJ1IjoiMTJwYXJrbCIsImEiOiJjaXllemhvYmEwMHF3MzVrNTA5djg0NnJsIn0.5pHqYmljwlmbl9_w-KDGxg";

function runOnce() {
  newMap(40.7128,-74.0059,10,defaultToken);

  // CSS fix to overloaded styles from .less
  $("h1").css("font-size","24px");
  $("h1").css("margin-top","8px");
}
