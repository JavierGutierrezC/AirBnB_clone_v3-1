const amenities = {};
$(function () {
  $('input[type=checkbox]').prop('checked', false);

  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.attributes['data-id'].value] = this.attributes['data-name'].value;
    } else {
      delete amenities[this.attributes['data-id'].value];
    }
    if (!($.isEmptyObject(amenities))) {
      $('div.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('div.amenities h4').text('\xa0');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status', function (response, status) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
