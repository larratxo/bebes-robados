/* global Template alertMessage Persons success */
Template.bebeAdminOps.helpers({
  text: function () { return this.item.validated ? 'Publicado' : 'No publicado'; },
  icon: function () { return this.item.validated ? 'fa-check' : 'fa-times'; },
  isGeo: function () {
    return false; // disabled
    // return isValidLatLng(this.item.lugarNacimientoLongitud) && isValidLatLng(this.item.lugarNacimientoLatitud);
  }
});
var checkIcon = "<i class='fa fa-check'></i>&nbsp;";
var uncheckIcon = "<i class='fa fa-times'></i>&nbsp;";

Template.bebeAdminOps.events({
  'mouseover .validate': function (e, template) {
    var val = this.item.validated;
    e.currentTarget.innerHTML = val ? uncheckIcon + 'No publicar' : checkIcon + 'Publicar';
  },
  'mouseout .validate': function (e, template) {
    var val = this.item.validated;
    e.currentTarget.innerHTML = val ? checkIcon + 'Publicado' : uncheckIcon + 'No publicado';
  },
  'click .erase': function (e, template) {
    alertMessage('En desarrollo');
    e.stopImmediatePropagation();
  },
  'click .validate': function (e, template) {
    e.currentTarget.disabled = true;
    var value = !this.item.validated;
    Persons.update(this.item._id, {$set: {validated: value}}, function () {
      success(value ? 'Publicado' : 'No publicado');
      e.currentTarget.disabled = false;
    });
    e.stopImmediatePropagation();
  }
});
