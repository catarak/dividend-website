$(function() {
  $("#about").click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: $('#about-section').offset().top }, 500);
  });

  $("#purchase").click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: $('#purchase-section').offset().top }, 500);
  });

  $("#logo").click(function(e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, 500);
  });

  $("#purchase-form").submit(function(e) {
		e.preventDefault();
    var address = $('#wallet-address').val();
    $.post('/transactions', {address: address}, function(data) {
      $('#wallet-address').val(""); 
    });
  });
});