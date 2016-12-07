/* global Template alertMessage Persons success _ TAPi18n */
Template.bebeAdminOps.helpers({
  text: function () { return this.item.validated ? TAPi18n.__('Publicado') : TAPi18n.__('No publicado'); },
  icon: function () { return this.item.validated ? 'fa-check' : 'fa-times'; },
  isGeo: function () {
    return false; // disabled
    // return isValidLatLng(this.item.lugarNacimientoLongitud) && isValidLatLng(this.item.lugarNacimientoLatitud);
  }
});
var checkIcon = "<i class='fa fa-check'></i>&nbsp;";
var uncheckIcon = "<i class='fa fa-times'></i>&nbsp;";

Template.bebeAdminOps.events({
  'mouseover .validate': _.throttle(function (e, template) {
    var val = this.item.validated;
    e.currentTarget.innerHTML = val ? uncheckIcon + TAPi18n.__('No publicar') : checkIcon + TAPi18n.__('Publicar');
  }, 500),
  'mouseout .validate': _.throttle(function (e, template) {
    var val = this.item.validated;
    e.currentTarget.innerHTML = val ? checkIcon + TAPi18n.__('Publicado') : uncheckIcon + TAPi18n.__('No publicado');
  }, 500),
  'click .erase': function (e, template) {
    alertMessage('En desarrollo');
    e.stopImmediatePropagation();
  },
  'click .validate': function (e, template) {
    e.currentTarget.disabled = true;
    var value = !this.item.validated;
    Persons.update(this.item._id, {$set: {validated: value}}, function () {
      success(value ? TAPi18n.__('Publicado') : TAPi18n.__('No publicado'));
      e.currentTarget.disabled = false;
    });
    e.stopImmediatePropagation();
  }
});
