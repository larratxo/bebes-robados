/* global Meteor Migrations Persons siteSettings siteSettingsTypes */
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
  Migrations.add({
    version: 3,
    up: function () {
      siteSettings.insert({
        name: 'site-main-name',
        value: 'REENCONTRAR.SE',
        description: 'Nombre principal de la web',
        type: 'string'
      });
      siteSettings.insert({
        name: 'site-main-subname',
        value: 'Red Ciudadana de Búsqueda de Bebes Robados',
        description: 'Subtítulo de la web que sale en la cabecera',
        type: 'textarea'
      });
      siteSettings._ensureIndex({name: 1}, {unique: 1});
    }
  });
  Migrations.add({
    version: 4,
    up: function () {
      siteSettings.insert({
        name: 'home-slogan-1',
        value: 'Tras miles de casos de bebes robados',
        description: 'Eslogan principal de la página inicial',
        type: 'textarea'
      });
      siteSettings.insert({
        name: 'home-slogan-2',
        value: 'queremos reencontrarnos',
        description: 'Eslogan principal de la página inicial (segunda parte en negrita)',
        type: 'textarea'
      });
      siteSettings.insert({
        name: 'home-slogan-description',
        value: 'Durante décadas y hasta hace no mucho, ha habido infinidad de robos de recién nacidos en España en clínicas y maternidades por motivos ideológicos y/o económicos.',
        description: 'Texto de la página inicial por debajo del eslogan',
        type: 'textarea'
      });
    }
  });
  Migrations.add({
    version: 5,
    up: function () {
      siteSettings.insert({
        name: 'adcampaign-1-slogan',
        value: 'En España hay miles casos de bebes robados, ayúdanos a reencontrarnos',
        description: 'Eslogan de la campaña de difusión primera',
        type: 'textarea'
      });
    }
  });
  Migrations.add({
    version: 6,
    up: function () {
      siteSettings.insert({
        name: 'email-subject-prefix',
        value: 'Red de Bebes Robados',
        description: 'Nombre corto de esta iniciativa que se usa como prefijo en los títulos de los correos de verificación, etc que se envían a usuarios/as',
        type: 'string'
      });
    }
  });
  Migrations.migrateTo('latest');

  // Migrations.migrateTo('3,rerun');
  // Migrations.migrateTo('4,rerun');
});
