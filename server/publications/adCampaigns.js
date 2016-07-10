/* global Meteor, AdCampaigns currentAdCampaign */

Meteor.publish('AdCampaigns', function () {
  return AdCampaigns.find();
});

Meteor.publish('myCampaigns', function () {
  return AdCampaigns.find({ group: currentAdCampaign,
                            user: this.userId });
});
