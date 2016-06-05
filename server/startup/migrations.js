/* global Meteor Migrations Persons */
Meteor.startup(function () {
  // https://github.com/percolatestudio/meteor-migrations
  Migrations.add({
    version: 1,
    up: function () {
    }
  });

  Migrations.migrateTo('latest');
});
