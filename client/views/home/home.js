Template.home.onRendered(function() {
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
