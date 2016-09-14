/* global Meteor Dispatcher:true $ */

// From: https://github.com/zendylabs/dispatcher-meteor-package
// Intercepts all links with hook="dispatch" to force open in native apps and also track analitics
Dispatcher = {};
Dispatcher.events = {
  'click [hook="dispatch"]': function (evt) {
    evt.preventDefault();
    var destination = $(evt.currentTarget).attr('href');
    Meteor.Piwik.trackLink(destination);
    window.open(destination, '_system');
  }
};
