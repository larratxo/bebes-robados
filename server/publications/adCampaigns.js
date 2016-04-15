/* global Meteor, AdCampaigns */
Meteor.publish('AdCampaigns', function () {
  return AdCampaigns.find();
});
