/* global Template thisYear Dispatcher */
Template.homeFooter.helpers({
  thisYear: function () {
    return thisYear;
  }
});

Template.homeFooter.events(Dispatcher.events);
