/* global SyncedCron Persons AdCampaigns Meteor */
SyncedCron.add({
  name: 'Notify admins about pending tasks',
  schedule: function (parser) {
    // Only for testing
    // return parser.text('every 1 minutes');
    return parser.text('every 24 hours');
  },
  job: function () {
    var pendingPersons = Persons.find({validated: false}).count();
    var pendingCampaigns = AdCampaigns.find({validated: false}).count();
    var tasks = pendingPersons + pendingCampaigns;
    if (tasks > 0 && Meteor.settings.public.isProduction) {
      // Only notify in production
      Meteor.apply(
        'sendNotifToRole',
        ['admin', 'Tareas pendientes de moderación',
         'Queridos administradores/as:\n\n Hay casos de bebes robados y/o campañas de difusión pendientes de moderar.'], true);
    }
    return tasks;
  }
});

SyncedCron.config({
  // Log job run details to console
  log: true
});

SyncedCron.start();
