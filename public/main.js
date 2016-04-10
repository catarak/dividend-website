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

    $.get("https://counterpartychain.io/api/address/" + address, function(data) {
      var response = JSON.parse(data);
      if (data.success) {
        $.post('/transactions', {address: address}, function(data) {
          $('#wallet-address').val(""); 
          $('#submission-info').text("Request received");
        });
      }
      else {
        $('#submission-info').text("Invalid wallet address");
      }
    });
  });
});