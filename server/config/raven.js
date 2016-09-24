/* global RavenLogger, Meteor, Raven */
RavenLogger.initialize({
  server: Meteor.settings.private.ravenServerDSN
}, {
  patchGlobal: Meteor.settings.public.isProduction
});
