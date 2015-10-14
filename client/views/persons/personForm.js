/* global GoogleMaps,google,geocode:true,provincia,provinces,municipio,
   municipes,noUndef, resetMarker:true */
Template.bebeForm.helpers({
  isEqual: function (type, otherType) {
    return type === otherType;
  },
  defaultFalse: function () {
    return false;
  },
  defaultTrue: function () {
    return true;
  },
  mapOptions: function() {
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
  GoogleMaps.ready('lugarNacimientoMap', function(map) {
    resetMarker();
    geocode();
  });
  GoogleMaps.ready('cementerioEnterradoMap', function(map) {
    $.bootstrapGrowl("Funca 2");
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
  $("#lugarNacimientoLatitud").val("");
  $("#lugarNacimientoLongitud").val("");
  var geocoder = new google.maps.Geocoder();
  var direccion = ((typeof lugar === "string"? lugar: "") + " " + (typeof lugarDire === "string"? lugarDire : "") + " " + lugarMuni + " " + lugarProv + " " + lugarPais).trim();
  // Delete marker if exists
  resetMarker();
  if (direccion.length > 0) {
    console.log("Buscando " + direccion);
    geocoder.geocode({'address': direccion }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // console.log(results[0].geometry.location.lat());
        lat = results[0].geometry.location.lat().toString();
        long = results[0].geometry.location.lng().toString();
        console.log('Geocode was successful');
        var map = GoogleMaps.maps.lugarNacimientoMap.instance;
        var newMarker = new google.maps.Marker({
          position: { lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng() },
          map: map
        });
        nacimientoMarker = newMarker;
        map.setCenter(newMarker.getPosition());
      } else {
        console.log(
          'Geocode was not successful for the following reason: ' + status);
      }
      $("#lugarNacimientoLatitud").val(lat);
      $("#lugarNacimientoLongitud").val(long);
    });
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

Template.bebeForm.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#cementerioEnterrado").geocomplete({
        map: "#cementerioEnterradoMap"
      });
    }
  });

  var provinceCssSelector = '.ps-prov';
  var municipeCssSelector = '.ps-mun';
  var provinceDefaultText = 'Provincia';
  var municipeDefaultText = 'Municipio';
  var provinceName = "#lugarNacimientoProvinciaNombre";
  var municipeName = "#lugarNacimientoMunicipioNombre";

  function changeMuni(selectedProvince) {
    $(municipeCssSelector).empty();
    $(municipeCssSelector).append($('<option>').text(municipeDefaultText).attr('value', -1));
    $.each(municipes, function(number, municipe) {
      if (municipe.cod_prov === selectedProvince) {
        $(municipeCssSelector).append($('<option>').text(municipe.name).attr('value', number.toString()));
      }
    });
  }

  // Set default text
  $(provinceCssSelector).append($('<option>').text(provinceDefaultText).attr('value', -1));
  $(municipeCssSelector).append($('<option>').text(municipeDefaultText).attr('value', -1));

  // Populate province select
  $.each(provinces, function(number, province) {
    $(provinceCssSelector).append($('<option>').text(province.name).attr('value', province.code));
  });

  // When selected province changes, populate municipe select
  $(provinceCssSelector).change(function() {
    console.log("Provincia cambiada");
    var prov = this.value;
    changeMuni(prov);
    // Clear muni
    $(municipeName).val("");
    if (!isNaN(prov) && prov >= 0) {
      $(provinceName).val(provincia(prov));
    } else {
      $(provinceName).val("");
    }
    geocode();
  });

  $(municipeCssSelector).change(function() {
    console.log("Municipio cambiado");
    var muni = this.value;
    if (!isNaN(muni) && muni >= 0) {
      $(municipeName).val(municipio(muni));
    } else {
      $(municipeName).val("");
    }
    geocode();
  });

  var prov;
  var muni;

  if (typeof this.data !== "undefined" &&
    typeof this.data.doc !== "undefined" && this.data.doc !== null ) {
    prov = this.data.doc.lugarNacimientoProvincia;
    muni = this.data.doc.lugarNacimientoMunicipio;
  }

  // Restore values on update
  if (!isNaN(prov) && prov >= 0) {
    $(provinceCssSelector).val(prov);
  }
  if (!isNaN(muni) && muni >= 0) {
    changeMuni(prov);
    $(municipeCssSelector).val(muni);
  }

});
