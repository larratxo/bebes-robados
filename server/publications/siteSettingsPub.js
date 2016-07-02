/* global Meteor, siteSettings */

// About null autopublish
// http://support.kadira.io/knowledgebase/articles/379961-what-is-null-autopublish-publication
Meteor.publish(null, function () {
  return siteSettings.find();
});
