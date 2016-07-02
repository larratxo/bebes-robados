/* global Template siteSettings AutoForm Session alertMessage */
Template.siteSettingsForm.helpers({
  schema: function () {
    if (this.doc) {
      return siteSettings.getSchema(this.doc.type);
    }
  }
});



AutoForm.hooks({
  siteSettingEdit: {
    onSuccess: function (formType, result) {
      AutoForm.resetForm('siteSettingEdit');
      Session.set('site-settings-editing', false);
    },
    onError: function (formType, error) {
      alertMessage(error);
    }
  }
});
