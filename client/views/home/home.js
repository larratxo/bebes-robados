Template.home.helpers({
  mainMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(36.5270612, -6.2885962), // Cadiz
        // mapTypeId: google.maps.MapTypeId.SATELLITE,
        zoomControl: true,
        // Sin nombres ni carreteras
        // styles: [{ featureType: "road", stylers: [  {visibility: "on"} ] } ],
        zoom: 5
        // Maybe:
        // https://stackoverflow.com/questions/9555499/apply-mask-to-google-map
      };
    }
  }
});

Template.home.events({
  'keypress #home-main-search': function (event) {
    if (event.which === 13) {
      event.preventDefault();
      var search = event.target.value
      Session.set("main-home-search", search);
      Router.go('personsList');
    }
  },
  'submit form' : function (event) {
    event.preventDefault();
  }
});


var markers = {};

var markerVisibility = function(person, min, max) {
  return min <= person.fechaNacimiento && person.fechaNacimiento <= max;
};

var fitMarkers = function() {
  return;
  // does not work
  var bounds = new google.maps.LatLngBounds();
  var map = GoogleMaps.maps.mainMap.instance;

  var keys = Object.keys(markers);
  for (var i = 0; i < keys.length; i++) {
    var id = keys[i];
    bounds.extend(markers[id].getPosition());
  }

  //center the map to a specific spot (city)
  // map.setCenter(center);

  //center the map to the geometric center of all markers
  map.setCenter(bounds.getCenter());

  map.fitBounds(bounds);

  //remove one zoom level to ensure no marker is on the edge.
  map.setZoom(map.getZoom()-1);

  // set a minimum zoom
  // if you got only 1 marker or all markers are on the same address map will be zoomed too much.
  if(map.getZoom() > 12){
    map.setZoom(12);
  }
};

Template.home.onRendered(function() {
  Session.set("DocumentTitle", "Inicio");

  onSliderRender(function() {
    // TODO https://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-markers-visible-markers

    // repaint markers in some year
    var min = new Date(Session.get("minBornYear"),0,1);
    var max = new Date(Session.get("maxBornYear"),11,31);
    var showAll = calcShowAll();
    var keys = Object.keys(markers);
    for (var i = 0; i < keys.length; i++) {
      var id = keys[i];
      var marker = markers[id];
      if (noUndef(marker)) {
        if (showAll) {
          // show all markers
          marker.setVisible(true);
        } else {
          var person = Persons.find(id);
          if (person.count() === 1) {
            marker.setVisible(markerVisibility(person.fetch()[0], min, max));
          }
        }
      }
    }
    fitMarkers();
  });
});

Template.home.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('mainMap', function(map) {
    // Add a marker to the map once it's ready
    var min = new Date(Session.get("minBornYear"),0,1);
    var max = new Date(Session.get("maxBornYear"),11,31);

    var infowindow = new google.maps.InfoWindow();
    var createMarker = function (map, person) {
      var lat = person.lugarNacimientoLatitud;
      var long = person.lugarNacimientoLongitud;
      if (isValidLatLng(lat) && isValidLatLng(long)) {
        //console.log("Adding new marker to map");
        var isNew = person.updatedAt > lastDay();
        // https://developers.google.com/maps/documentation/javascript/markers
        var image = {
          url: isNew ? '/images/gmaps-pointer-new.png': person.buscasBebe? '/images/gmaps-pointer.png': '/images/gmaps-pointer-familia.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(29, 50),
          // The origin for this image is (0, 0).
          scaledSize: new google.maps.Size(29, 50),
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(14, 50)
        };
        var marker = new google.maps.Marker({
          map: map.instance,
          // https://developers.google.com/maps/documentation/javascript/examples/map-latlng-literal
          icon: image,
          position:  {lat: parseFloat(lat), lng: parseFloat(long)}
        });
        marker.setVisible(markerVisibility(person, min, max));
        markers[person._id] = marker;

        // https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
        google.maps.event.addListener(marker, 'click', (function(marker, person) {
          return function() {
            infowindow.setContent("<a href='/bebe/" + person._id + "/'>" +
                                    (person.buscasBebe? "Buscamos bebe ":
                                     "Busco a mi familia biológica ") + renderSexoAlt(person.sexo) +
                                      (person.fechaNacimiento instanceof Date?
                                       (person.buscasBebe? " nacido aquí el ": " nací aquí el "): " nacido aquí ") +
                                  renderAprox(person.fechaNacimientoEsAprox) + renderDate(person.fechaNacimiento) +
                 (isNew? " <span class='label label-warning'>Nuevo</span>" : "") + "</a>");
            infowindow.open(map.instance, marker);
          }
        })(marker, person));
      }
      fitMarkers();
    };

    Persons.find().observe({
      // http://meteorcapture.com/how-to-create-a-reactive-google-map/
      added: function(document) {
        //console.log("Added new marker");
        createMarker(map, document);
      },
      changed: function(newDocument, oldDocument) {
        // console.log("Changed marker");
        var oldMarker = markers[newDocument._id];
        if (typeof oldMarker !== 'undefined') {
          oldMarker.setPosition({ lat: parseFloat(newDocument.lugarNacimientoLatitud),
                                  lng: parseFloat(newDocument.lugarNacimientoLongitud) });
        } else {
          createMarker(map, newDocument);
        }
      },
      removed: function(oldDocument) {
        var oldMarker = markers[newDocument._id];
        if (typeof oldMarker !== 'undefined') {
          oldMarker.setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      }
    });
  });
});
