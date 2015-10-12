Template.bebeForm.helpers({
  isEqual: function (type, otherType) {
    return type === otherType;
  },
  defaultFalse: function () {
    return false;
  },
  defaultTrue: function () {
    return true;
  }
});

Template.bebeForm.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      // $("#lugarNacimiento").geocomplete( {
      // map: "#lugarNacimientoMap",
      //details: "#lugarNacimientoDetalle",
      //detailsAttribute: "data-geo"
      //});
      $("#cementerioEnterrado").geocomplete({
        map: "#cementerioEnterradoMap"
      });
    }
  });
});

var updateLugar = function(event, template) {
  var lugar = $("#lugarNacimiento").val();
  var lugarDire = $("#lugarNacimientoDireccion").val();
  var lugarProv = provincia($("#lugarNacimientoProvincia").val());
  var lugarMuni = municipio($("#lugarNacimientoMunicipio").val());

  console.log(lugar);
  console.log(lugarDire);
  console.log(lugarMuni);
  console.log(lugarProv);

  GoogleMaps.ready('lugarNacimientoMap', function(map) {
    var geocoder = new google.maps.Geocoder();
    var direccion = lugar + " " + lugarDire + " " + lugarMuni + " " + lugarProv
    // console.log("Buscando " + direccion);
    geocoder.geocode({'address': direccion }, function(results, status) {
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
}

geocode = function(event, template) {
  var lugar = $("#lugarNacimiento").val();
  var lugarDire = $("#lugarNacimientoDireccion").val();
  var lugarProv = $("#lugarNacimientoProvinciaNombre").val();
  var lugarMuni = $("#lugarNacimientoMunicipioNombre").val();
  var lat, long = "";
  $("#lugarNacimientoLatitud").val("");
  $("#lugarNacimientoLongitud").val("");
  var geocoder = new google.maps.Geocoder();
  var direccion = (typeof lugar === "string"? lugar: "") + " " + (typeof lugarDire === "string"? lugarDire : "") + " " + lugarMuni + " " + lugarProv;
  console.log("Buscando " + direccion);
  geocoder.geocode({'address': direccion }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.J.toString();
      long = results[0].geometry.location.M.toString();
      // console.log('Geocode was successful');
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
    $("#lugarNacimientoLatitud").val(lat);
    $("#lugarNacimientoLongitud").val(long);
  });

}

Template.bebePage.events( {
  "blur #lugarNacimiento": function (event, template) {
    geocode(event, template);
  },
  "blur #lugarNacimientoDireccion": function (event, template) {
    geocode(event, template);
  },
  "change #lugarNacimientoProvincia": function (event, template) {
    geocode(event, template);
  },
  "change #lugarNacimientoMunicipio": function (event, template) {
    geocode(event, template);
  }
});

Template.nuevoBebe.events( {
  "blur #lugarNacimiento": function (event, template) {
    geocode(event, template);
  },
  "blur #lugarNacimientoDireccion": function (event, template) {
    geocode(event, template);
  },
  "change #lugarNacimientoProvinciaNombre": function (event, template) {
    geocode(event, template);
  },
  "change #lugarNacimientoMunicipioNombre": function (event, template) {
    geocode(event, template);
  }
});
