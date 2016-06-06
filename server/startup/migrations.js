/* global Meteor Migrations Persons */
Meteor.startup(function () {
  // https://github.com/percolatestudio/meteor-migrations

  Migrations.config({
  // Log job run details to console
    log: true
  });

  Migrations.add({
    version: 1,
    up: function () {
    }
  });
  Migrations.add({
    version: 2,
    up: function () {
      Persons.update({validated: null}, {$set: {validated: false}}, {multi: true});
    }
  });

  Migrations.migrateTo('latest');
});
