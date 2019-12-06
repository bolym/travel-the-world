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

function getCookie(name){
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(""+name+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

var visited = getCookie("visited");
console.log("visited: ", visited);
var allCountries = Array.from(document.querySelectorAll('path'));
allCountries.forEach(function(i) {
  if(i.getAttribute("id") === "US"){
    i.addEventListener("click", openUS);
  }
  if(visited.includes(i.getAttribute("title"))){
    i.addEventListener("click", handleVisited);
    console.log("we've visited here!");
  } else {
    i.addEventListener("click", handleNotVisited);
    console.log("we haven't visited here!");
  }
});

document.getElementById("home").addEventListener("click", function(){
  window.location.href = window.location.origin;
  console.log("Went home");
});

function openUS() {
  window.location.assign("/US.html");
}

function handleNotVisited(e) {
  //alert("We haven't visited here yet, silly Raimy!");
  //var target = e.target.getAttribute("id");
  var target = e.currentTarget.getAttribute("title");
  showCreateTwitModal(target);
}

function handleVisited() {
  console.log("Registered on Client Side");
  var id = this.getAttribute("id");
  var videoLocation = this.getAttribute("title");
  console.log("The coutry visited that was clicked is: ", videoLocation);

  //request video with that title
  var url = '/visited/' + videoLocation;
  window.location.href = window.location.origin + url;

  console.log("request for visited sent");

}

function handleModalAcceptClick() {

  var location = document.getElementById('video-location-input').value.trim();
  var link = document.getElementById('video-link-input').value.trim();

  if (!link) {
    alert("You must provide an embed link!");
  } else {
    console.log("location: ", location);
    console.log("link: ", link);
    var request = new XMLHttpRequest();
    var url = '/addVideo/' + location;
    request.open('POST', url);

    var video = {
      location: location,
      link: link
    };
    var requestBody = JSON.stringify(video);
    console.log("== requestBody:", requestBody);

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);

    hideModal();
  }

}

function showCreateTwitModal(targ) {

  var target = targ;

  var newHeader = "<h3> Just Visited " + target + "? </h3>";
  console.log("New Header: ", newHeader);

  document.getElementById('modal-template').innerHTML = newHeader;
  document.getElementById('video-location-input').value = target;

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createTwitModal = document.getElementById('add-video-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createTwitModal.classList.remove('hidden');

}

function hideModal() {

  var modal = document.getElementById('add-video-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  var location = document.getElementById('video-location-input');
  var link = document.getElementById('video-link-input');

  location.value = "";
  link.value = "";

}

window.addEventListener('DOMContentLoaded', function () {

  var modalAcceptButton = document.getElementsByClassName('modal-accept-button');
  modalAcceptButton[0].addEventListener('click', handleModalAcceptClick);

  var modalCloseButton = document.getElementsByClassName('modal-close-button');
  var modalCancelButton = document.getElementsByClassName('modal-cancel-button');
  modalCloseButton[0].addEventListener('click', hideModal);
  modalCancelButton[0].addEventListener('click', hideModal);
});
