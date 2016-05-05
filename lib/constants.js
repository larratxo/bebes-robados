/* global Meteor */
// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see lib/constants.js');
}

Meteor.App = {
  NAME: 'Red Ciudadana de Búsqueda de Bebes Robados',
  DESCRIPTION: 'Red Ciudadana de Registro, búsqueda y denuncia de casos de Bebes Robados.'
};
