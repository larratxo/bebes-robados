/* global Meteor, abuseReports */
Meteor.publish('abuseReports', function () {
  return abuseReports.find();
});
