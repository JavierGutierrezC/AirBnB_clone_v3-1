const amenities = {};

function generateHTMLPlaces (places) {
  $('SECTION.places').empty();
  for (const place of places) {
    const article = $('<article></article>');

    const title = $('<div></div>').addClass('title');
    title.append($('<h2></h2>').text(place.name));
    title.append($('<div></div>').addClass('price_by_night')
      .text(place.price_by_night));

    const information = $('<div></div>').addClass('information');

    const maxGuest = $('<div></div>').addClass('max_guest');
    maxGuest.append($('<i></i>').addClass('fa fa-users fa-3x')
      .attr('aria-hidden', 'true'));
    maxGuest.append('<br/>');
    maxGuest.append(`${place.max_guest} Guests`);

    const numberRooms = $('<div></div>').addClass('number_rooms');
    numberRooms.append($('<i></i>').addClass('fa fa-bed fa-3x')
      .attr('aria-hidden', 'true'));
    numberRooms.append('<br/>');
    numberRooms.append(`${place.number_rooms} Bedrooms`);

    const numberBathrooms = $('<div></div>').addClass('number_bathrooms');
    numberBathrooms.append($('<i></i>').addClass('fa fa-bath fa-3x')
      .attr('aria-hidden', 'true'));
    numberBathrooms.append('<br/>');
    numberBathrooms.append(`${place.number_bathrooms} Bathrooms`);

    information.append(maxGuest);
    information.append(numberRooms);
    information.append(numberBathrooms);

    const description = $('<div></div>').append('</br>');
    description.append(place.description);

    article.append(title);
    article.append(information);
    article.append(description);

    $('SECTION.places').append(article);
  }
}

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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: function (response, status) {
      generateHTMLPlaces(response);
    }
  });

  $('BUTTON').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      data: `{"amenities": ${JSON.stringify(Object.keys(amenities))}}`,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (response, status) {
        generateHTMLPlaces(response);
      }
    });
  });
});

