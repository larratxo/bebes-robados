/* global RavenLogger, Meteor  */
RavenLogger.initialize({
  client: Meteor.settings.public.ravenClientDSN
}, {
  trackUser: true
});
