/* global Template AdCampaigns */
Template.difuErase.events({
  'click .erase': function (e, template) {
    AdCampaigns.remove(this.item._id);
  }
});
