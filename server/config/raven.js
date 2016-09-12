/* global RavenLogger, Meteor */
RavenLogger.initialize({
  server: Meteor.settings.private.ravenServerDSN
}, {
  patchGlobal: true
});
