
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


var visited = ["US-WA", "US-OR", "US-CA"];
var allStates = Array.from(document.querySelectorAll('path'));
allStates.forEach(function(i) {
  if(visited.includes(i.getAttribute("id"))){
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
