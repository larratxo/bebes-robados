/* global GoogleMaps,google,geocode:true,provincia,municipio,Template, alert, success, Roles
 noUndef, resetMarker:true, Meteor, Router, $ ReactiveVar */

var toDelete = new ReactiveVar();

Template.bebeForm.helpers({
  isFamiliarOrAdmin: function () {
    return Roles.userIsInRole(Meteor.userId(), ['admin']) || Meteor.userId() === this.doc.familiar;
  },
  isFamiliar: function () {
    return Meteor.userId() === this.familiar;
  },
  isEqual: function (type, otherType) {
    return type === otherType;
  },
  defaultFalse: function () {
    return false;
  },
  defaultTrue: function () {
    return true;
  },
  onError: function () {
    return function (error) {
      alert('Error al borrar');
      console.log(error);
    };
  },
  onSuccess: function () {
    return function (result) {
      success('Borrado');
    };
  },
  beforeRemove: function () {
    return function (collection, id) {
      toDelete.set(this);
      $('#delete-babe').confirmation('show');
    };
  },

  mapOptions: function () {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(36.5270612, -6.2885962), // Cadiz
        zoom: 4
      };
    }
  }
});

Template.bebeForm.onCreated(function() {
  AutoForm.resetForm("editaBebeForm");
  AutoForm.resetForm("nuevoBebeForm");
  GoogleMaps.ready('lugarNacimientoMap', function(map) {
    resetMarker();
    geocode();
  });
  GoogleMaps.ready('cementerioEnterradoMap', function(map) {
    // $.bootstrapGrowl("Funca 2");
  });
});

var nacimientoMarker;

resetMarker = function() {
  if (noUndef(nacimientoMarker)) {
    nacimientoMarker.setMap(null);
  }
};

geocode = function() {
  // console.log("Trying to geocode");
  var lugar = $("#lugarNacimiento").val();
  var lugarDire = $("#lugarNacimientoDireccion").val();
  var lugarProv = $("#lugarNacimientoProvinciaNombre").val();
  var lugarMuni = $("#lugarNacimientoMunicipioNombre").val();
  var lugarPais = $("#lugarNacimientoPais").val();

  var lat, long = "";
  if (!google) {
    // Not yet ready
    return;
  }
  var geocoder = new google.maps.Geocoder();
  var direccion = ((typeof lugar === "string"? lugar: "") + " " +
                  (typeof lugarDire === "string"? lugarDire : "") + " " +
                   lugarMuni + " " + lugarProv + " " + lugarPais).trim();
  // Delete marker if exists
  resetMarker();
  if (direccion.length > 0) {
    var map = GoogleMaps.maps.lugarNacimientoMap.instance;
    console.log("Buscando " + direccion);
    geocoder.geocode({'address': direccion }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // console.log(results[0].geometry.location.lat());
        lat = results[0].geometry.location.lat().toString();
        long = results[0].geometry.location.lng().toString();
        // console.log('Geocode was successful');
        var newMarker = new google.maps.Marker({
          position: { lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng() },
          map: map
        });
        nacimientoMarker = newMarker;
        map.setCenter(newMarker.getPosition());
        map.setZoom(11);
      } else {
        map.setZoom(4);
        console.log(
          'Geocode was not successful for the following reason: ' + status);
      }
      $("#lugarNacimientoLatitud").val(lat);
      $("#lugarNacimientoLongitud").val(long);
    });
  } else {
    $("#lugarNacimientoLatitud").val("");
    $("#lugarNacimientoLongitud").val("");
  }
};

Template.bebePage.events( {
  "blur #lugarNacimiento": function (event, template) {
    geocode(event, template);
  },
  "blur #lugarNacimientoDireccion": function (event, template) {
    geocode(event, template);
  }
});

Template.nuevoBebe.events( {
  "blur #lugarNacimiento": function (event, template) {
    geocode(event, template);
  },
  "blur #lugarNacimientoDireccion": function (event, template) {
    geocode(event, template);
  }
});

Template.bebeForm.onRendered(function () {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#cementerioEnterrado").geocomplete({
        map: "#cementerioEnterradoMap"
      });
    }
  });

  $('#delete-bebe').confirmation({
    title: '¿Estás seguro?',
    btnOkLabel: 'Borrar',
    btnCancelLabel: 'No',
    placement: 'top',
    onConfirm: function () {
      Router.go('personsList');
      toDelete.get().remove();
    }
  });

  // Render provincias
  var provinceName = "#lugarNacimientoProvinciaNombre";
  var municipeName = "#lugarNacimientoMunicipioNombre";

  var onProvSelect = function(prov) {
    // console.log("Prov select " + prov + " " + typeof prov);
    $(municipeName).val("");
    if (!isNaN(prov) && prov >= 0) {
      $(provinceName).val(provincia(prov));
    } else {
      $(provinceName).val("");
    }
    geocode();
  };

  var onMuniSelect = function(muni) {
    if (!isNaN(muni) && muni >= 0) {
      var muniName = municipio(muni);
      // console.log("Muni select de " + muni + ": " +  muniName + " " + typeof muni);
      $(municipeName).val(muniName);
    } else {
      $(municipeName).val("");
    }
    geocode();
  }

  var prevProv;
  var prevMuni;

  if (typeof this.data !== "undefined" &&
    typeof this.data.doc !== "undefined" && this.data.doc !== null ) {
    prevProv = this.data.doc.lugarNacimientoProvincia;
    prevMuni = this.data.doc.lugarNacimientoMunicipio;
  }

  renderProvincias(prevProv, prevMuni, onProvSelect, onMuniSelect);
  // Fin render provincias

});
