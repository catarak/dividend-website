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

    var valid = WAValidator.validate(address, 'bitcoin');
    if(valid) {
      $.post('/transactions', {address: address}, function(data) {
        if (data.success) {
          $('#submission-info').text("Request received");
        }
        else {
          $('#submission-info').text("Dividend already claimed");
        }
        $('#wallet-address').val(""); 
      });
    }
    else {
      $('#submission-info').text("Invalid wallet address");
    }
  });
});