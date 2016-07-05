/* global siteSettings:true, Mongo, SimpleSchema, Roles siteSettingsTypes Meteor
 defaultCreatedAt */

siteSettings = new Mongo.Collection('siteSettings');

siteSettings.get = function (name) {
  var setting = siteSettings.findOne({
    name: name
  });
  return setting != null ? setting.value : void 0;
};

siteSettings.getSchema = function (type) {
  return new SimpleSchema({
    name: {
      type: String,
      autoform: { readonly: true, disabled: true }
    },
    type: {
      type: String
    },
    createdAt: defaultCreatedAt,
    value: siteSettingsTypes[type].value
  });
};

siteSettings.observe = function (name, callback) {
  siteSettings.find({name: name}).observe({
    added: function (document) {
      callback(document.value);
    }
  });
};

siteSettings.observe('site-main-subname',
                     function (value) { Meteor.App = { NAME: value }; });
siteSettings.observe('site-main-description',
                     function (value) { Meteor.App['DESCRIPTION'] = value; });

if (Meteor.isServer) {
  // About null autopublish
  // http://support.kadira.io/knowledgebase/articles/379961-what-is-null-autopublish-publication
  Meteor.publish(null, function () {
    return siteSettings.find();
  });
}

siteSettings.allow({
  insert: function (userId, doc) {
    return false;
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove: function (userId, doc) {
    return false;
  }
});
