/* global webPages:true, Meteor, Mongo, SimpleSchema, Roles */
webPages = new Mongo.Collection('webPages');

webPages.attachSchema(
  new SimpleSchema({
    title: { type: String },
    text: { type: String }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  webPages.allow({
    insert: function (userId) {
      return Roles.userIsInRole(userId, ['admin']);
    },
    update: function (userId) {
      return Roles.userIsInRole(userId, ['admin']);
    },
    remove: function () {
      return false;
    }
  });
}
