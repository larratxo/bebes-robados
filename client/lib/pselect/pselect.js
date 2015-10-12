

Template.bebeForm.onRendered(function() {
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
      if (municipe.cod_prov == selectedProvince) {
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
    var prov = this.value;
    changeMuni(prov);
    // Clear muni
    $(municipeName).val("");
    if (!isNaN(prov) && prov >= 0) {
      $(provinceName).val(provincia(prov));
    } else {
      $(provinceName).val("");
    }
  });

  $(municipeCssSelector).change(function() {
    var muni = this.value;
    if (!isNaN(muni) && muni >= 0) {
      $(municipeName).val(municipio(muni));
    } else {
      $(municipeName).val("");
    }
  });

  var prov;
  var muni;

  if (typeof this.data !== "undefined" && typeof this.data.doc !== "undefined" && this.data.doc !== null ) {
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
