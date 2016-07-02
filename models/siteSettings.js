/* global siteSettings:true, Mongo, Schema:true, SimpleSchema, Roles AdminSettingsTypes:true siteSettingsTypes Meteor Accounts */

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
    value: siteSettingsTypes[type].value
  });
};

if (Meteor.isServer) {
  Accounts.emailTemplates.siteName = siteSettings.get('email-subject-prefix');
  Accounts.emailTemplates.from = siteSettings.get('site-main-name') + ' <noreply@comunes.org>';
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
