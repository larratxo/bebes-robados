/* global Template isValidLatLng $ */
Template.bebeAdminOps.helpers({
  isGeo: function () {
    return isValidLatLng(this.item.lugarNacimientoLongitud) && isValidLatLng(this.item.lugarNacimientoLatitud);
  }
});

Template.bebeAdminOps.events({
  'click .erase': function (e, template) {
    $.bootstrapGrowl('En desarrollo', {type: 'danger', align: 'center'});
    e.stopImmediatePropagation();
  }
});
