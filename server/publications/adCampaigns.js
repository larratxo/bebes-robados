/* global Meteor, AdCampaigns Persons */
Meteor.publish('AdCampaigns', function () {
  return [AdCampaigns.find(), Persons.find({familiar: this.userId}) ];
});
