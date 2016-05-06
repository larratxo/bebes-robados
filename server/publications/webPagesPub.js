/* global Meteor, webPages, check */
Meteor.publish('webPages', function (title) {
  check(title, String);
  return webPages.find({title: title}, {limit: 1});
});
