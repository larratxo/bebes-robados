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
