
$("path, circle").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).attr('title'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();

document.getElementById("home").addEventListener("click", function(){
  window.location.href = window.location.origin;
  console.log("Went home");
});

function getCookie(name){
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(""+name+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

var visited = getCookie("visited");
var allStates = Array.from(document.querySelectorAll('path'));
allStates.forEach(function(i) {
  if(visited.includes(i.getAttribute("title"))){
    i.addEventListener("click", handleVisited);
    console.log("we've visited here!");
  } else {
    i.addEventListener("click", handleNotVisited);
    console.log("we haven't visited here!");
  }
});

function handleNotVisited() {
  alert("We haven't visited here yet, silly Raimy!");
}

function handleVisited() {
  var id = this.getAttribute("id");
  var videoLocation = this.getAttribute("title");
  console.log("The coutry visited that was clicked is: ", videoLocation);

  //request video with that title
  var url = '/visited/' + videoLocation;
  window.location.href = window.location.origin + url;

  console.log("request for visited sent");
}
