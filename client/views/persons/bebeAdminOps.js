/* global Template isValidLatLng $ alert */
Template.bebeAdminOps.helpers({
  isGeo: function () {
    return isValidLatLng(this.item.lugarNacimientoLongitud) && isValidLatLng(this.item.lugarNacimientoLatitud);
  }
});

Template.bebeAdminOps.events({
  'click .erase': function (e, template) {
    alert('En desarrollo');
    e.stopImmediatePropagation();
  }
});
