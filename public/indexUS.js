
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

document.getElementById("US-WA").addEventListener("click", openWA);
document.getElementById("US-OR").addEventListener("click", openOR);
document.getElementById("US-CA").addEventListener("click", openCA);

function openWA() {
  //window.location.assign("/WA.html");
  alert("Washington clicked");
}

function openOR() {
  //window.location.assign("/OR.html");
  alert("Oregon Clicked");
}

function openCA() {
  //window.location.assign("/CA.html");
  alert("California clicked");
}
