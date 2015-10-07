Template.nuevoBebe.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#lugarNacimiento").geocomplete( {
        map: "#lugarNacimientoMap",
        details: "#lugarNacimientoDetalle",
        detailsAttribute: "data-geo"
      });
      $("#cementerioEnterrado").geocomplete({
        map: "#cementerioEnterradoMap"
      });
    }
  });
});

Template.home.helpers({
  mainMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(36.5270612, -6.2885962), // Cadiz
        // center: new google.maps.LatLng(37.3880961, -5.9823299), // Sevilla (para que se vea Canarias)
        // center: new google.maps.LatLng(40.4167754, -3.7037902), // Madrid

        // zoom: 5
        zoom: 4
      };
    }
  }
});

Template.home.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('mainMap', function(map) {
    var geocoder = new google.maps.Geocoder();

    // Add a marker to the map once it's ready
    var cursor = Persons.find();
    cursor.forEach(function (person) {
      // console.log("lug: " + person.lugarNacimiento);
      geocoder.geocode({'address': person.lugarNacimiento}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            map: map.instance,
            position: results[0].geometry.location
          });
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});
