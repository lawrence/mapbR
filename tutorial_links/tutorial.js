// Tutorial NavBar event handlers for clicks:
$(document).ready(function(){
  $("#content-tutorial").load('tutorial_links/home.html');
  $("#tut_home").on("click",function() {
    $("#console-tutorial").css("height","auto");
    $("#content-tutorial").load('tutorial_links/home.html');
  });
  $("#tut_doc").on("click",function() {
    $("#console-tutorial").css("height","550px");
    $("#content-tutorial").load('tutorial_links/doc.html');
  });
  $("#tut_example").on("click",function() {
    $("#console-tutorial").css("height","auto");
    $("#content-tutorial").load('tutorial_links/example.html');
  });
});

// (F) openTutorial(): opens tutoral window
function openTutorial(){
  $("#console-tutorial").css("visibility","visible");
}

// (F) closeTutorial(): closes tutorial window
function closeTutorial(){
  $("#console-tutorial").css("visibility","hidden");
}

// (F) plugExample(): Plugs in example sample to mapBr
function plugExample(){
  // MapBox Values:
  $("#a_token").val("pk.eyJ1IjoiMTJwYXJrbCIsImEiOiJjaXllemhvYmEwMHF3MzVrNTA5djg0NnJsIn0.5pHqYmljwlmbl9_w-KDGxg");
  $("#map_url").val("mapbox://12parkl.61uo1wcn");
  $("#map_id").val("NYPD_Complaint_Data_Historic");
  $("#s_layer").val("NYPD_Complaint_Data_Historic-811nyd");
  $("#prop").val("occ");

  // Filter Values:
  $("#time_value").val("1");
  $("#time_unit").val("minutes");

  // Mapview Values:
  $("#lat_input").val("40.7128");
  $("#lon_input").val("-74.0059");
  $("#zoom_input").val("12");
}
