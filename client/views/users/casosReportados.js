/* global Template Persons */
Template.casosReportados.helpers({
  tieneBebes: function () {
    return Persons.find({ familiar: this.user._id }).count() > 0;
  },
  bebes: function () {
    return Persons.find({ familiar: this.user._id });
  }
});
