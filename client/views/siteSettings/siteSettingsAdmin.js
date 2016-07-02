/* global Template $ ReactiveVar siteSettings Session */

Template.siteSettingsAdmin.helpers({
  editing: function () {
    return Session.get('site-settings-editing');
  },
  setting: function () {
    return Template.instance().editingSetting.get();
  }
});

Template.siteSettingsAdmin.onCreated(function () {
  this.editingSetting = new ReactiveVar();
  Session.set('site-settings-editing', false);
});

Template.siteSettingsAdmin.events({
  'click tbody > tr': function (event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    var setting = siteSettings.findOne({name: rowData.name});
    template.editingSetting.set(setting);
    Session.set('site-settings-editing', true);
  }
});
