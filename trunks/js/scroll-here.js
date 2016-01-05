<!-- Template G scroll to item clicked -->
$(".scrollhere").click(function() {
	$('html, body').animate({
    scrollTop: $(this).offset().top -50
  }, 2000);
});

$(window).bind("mousewheel", function() {
    $("html, body").stop();
});
