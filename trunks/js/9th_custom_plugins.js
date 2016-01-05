// Header resize

$(window).scroll(function(){
  if($(document).scrollTop() > 30) {
    $('#header').addClass('small');

  } else {
    $('#header').removeClass('small');
  }
});


// On load, move body down

$(document).ready(function(){
  $('.iso_container').fadeIn(6000,function(){
     $(this).animate({"margin-top" : "150px"}, 3000);
   });
});



// Mobile Menu

$(function() {

  var menuVisible = false;

  $('#mobile_button').click(function() {
    if (menuVisible) {
      $('#mobile_nav').css({'display':'none'});
      menuVisible = false;
      return;
    }
    $('#mobile_nav').css({'display':'block'});
    	menuVisible = true;
  });

  $('#mobile_nav a').click(function() {
   $('#mobile_nav').css({'display':'none'});
    	menuVisible = false;
  });
});