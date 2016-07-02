/* global Meteor, siteSettings */

Meteor.publish('siteSettings', function () {
  return siteSettings.find();
});
