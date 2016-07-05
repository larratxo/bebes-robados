/* global Meteor Migrations Persons siteSettings Accounts */
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
    }
  });
  Migrations.add({
    version: 4,
    up: function () {
    }
  });
  Migrations.add({
    version: 5,
    up: function () {
    }
  });
  Migrations.add({
    version: 6,
    up: function () {
    }
  });
  Migrations.add({
    version: 7,
    up: function () {
      siteSettings._ensureIndex({name: 1}, {unique: 1});
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
      siteSettings.insert({
        name: 'adcampaign-1-slogan',
        value: 'En España hay miles casos de bebes robados, ayúdanos a reencontrarnos',
        description: 'Eslogan de la primera campaña de difusión',
        type: 'textarea'
      });
      siteSettings.insert({
        name: 'email-subject-prefix',
        value: 'Red de Bebes Robados',
        description: 'Nombre corto de esta iniciativa que se usa como prefijo en los títulos de los correos que se envían a usuarios/as de verificación, recuperación de contraseña, notificaciones, etc',
        type: 'string'
      });
    }
  });
  Migrations.add({
    version: 8,
    up: function () {
      siteSettings.insert({
        name: 'site-main-description',
        value: 'Red Ciudadana de Registro, Búsqueda y Denuncia de casos de Bebes Robados.',
        description: 'Esta es una descripción más detallada de esta iniciativa, de forma que los buscadores de internet, recogen esta información y facilita su clasificación por temática',
        type: 'textarea'
      });
    }
  });

  Migrations.migrateTo('latest');

  Accounts.emailTemplates.siteName = siteSettings.get('email-subject-prefix');
  Accounts.emailTemplates.from = siteSettings.get('site-main-name') + ' <noreply@comunes.org>';

  // Migrations.migrateTo('7,rerun');
});
