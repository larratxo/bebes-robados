/* global Template AdCampaigns */
Template.difuValidate.helpers({
  text: function () { return this.item.validated ? 'No validar' : 'Validar'; }
});
Template.difuValidate.events({
  'click .validate': function (e, template) {
    AdCampaigns.update(this.item._id, {$set: {validated: !this.item.validated}});
  }
});
