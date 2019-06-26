
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

document.getElementById("US").addEventListener("click", openUS);
document.getElementById("CA").addEventListener("click", openCanada);
document.getElementById("CU").addEventListener("click", openCuba);

function openUS() {
  window.location.assign("/US.html");
}

function openCanada() {
  //window.location.assign("/Canada.html");
  alert("Canada clicked");
}

function openCuba() {
  //window.location.assign("/Cuba.html");
  alert("Cuba Clicked");
}
