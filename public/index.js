
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

var visited = ["US", "CA", "CU", "GB", "IE"];
var allCountries = Array.from(document.querySelectorAll('path'));
allCountries.forEach(function(i) {
  if(visited.includes(i.getAttribute("id"))){
    if(i.getAttribute("id") === "US"){
      i.addEventListener("click", openUS);
    } else {
      i.addEventListener("click", handleVisited);
    }
    console.log("we've visited here!");
  } else {
    i.addEventListener("click", handleNotVisited);
    console.log("we haven't visited here!");
  }
});

document.getElementById("MX").addEventListener("click", handleMexico);

function handleMexico() {
  window.location.replace("http://flip2.engr.oregonstate.edu:3002/Mexico");
  console.log("request for visited sent");
}

function openUS() {
  window.location.assign("/US.html");
}

function handleNotVisited() {
  alert("We haven't visited here yet, silly Raimy!");
}

function handleVisited() {
  console.log("Registered on Client Side");
  var id = this.getAttribute("id");
  var videoLocation = this.getAttribute("title");
  console.log("The coutry visited that was clicked is: ", videoLocation);

  //request video with that title
  var url = '/visited/' + videoLocation;
  window.location.href = "http://flip2.engr.oregonstate.edu:3002" + url;

  console.log("request for visited sent");


  /* The following code was meant to render pages that displayed a video */
  /* But I've decided to use another website to store those for now */
  // var videoLocation = this.getAttribute("title");
  // var videoFile = "CaliforniaVideo.mp4";
  // var videoContext = {
  //   location: videoLocation,
  //   file: videoFile
  // };
  // var videoHTML = Handlebars.templates.video(videoContext);
  // console.log(videoHTML);

  //render a page with videoHTML

}
