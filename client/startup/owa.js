Meteor.startup(function () {
  Meteor.call('getOwaUrl', function(err, result) {
    Session.set('owaUrl', result);
  });
  Meteor.call('getOwaSiteId', function(err, result) {
    Session.set('owaSiteId', result);
  });
});
