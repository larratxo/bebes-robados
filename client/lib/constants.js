// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: "Red Ciudadana de Registro de Bebes Robados",
  DESCRIPTION: 'Red Ciudadana de Registro, búsqueda y denuncia de casos de Bebes Robados.'
};
