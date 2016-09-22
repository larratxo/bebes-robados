/* global Accounts accountsUIBootstrap3 Router nifValido */
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  forceEmailLowercase: true,
  forceUsernameLowercase: true,
  extraSignupFields: [
    {
      fieldName: 'name',
      fieldLabel: 'Nombre completo',
      inputType: 'text',
      visible: true,
      validate: function (value, errorFunction) {
        if (value.length > 10) {
          return true;
        } else {
          errorFunction('Nombre completo requerido');
          return false;
        }
      }
    },
    {
      fieldName: 'dni',
      fieldLabel: 'DNI',
      inputType: 'text',
      visible: true,
      saveToProfile: true,
      validate: function (value, errorFunction) {
        if (nifValido(value)) {
          return true;
        } else {
          errorFunction('DNI inválido');
          return false;
        }
      }
    },
    {
      fieldName: 'conServicioAceptadas',
      fieldLabel: 'Acepto las condiciones de servicio de este sitio',
      inputType: 'checkbox',
      visible: true,
      saveToProfile: false,
      validate: function (value, errorFunction) {
        if (value) {
          return true;
        } else {
          errorFunction('Debes aceptar las condiciones de servicio de este sitio.');
          return false;
        }
      }
    }
  ]
});

/* Normal account-ui
Meteor.logout(function(err) {
  Router.go('/');
});
*/

accountsUIBootstrap3.logoutCallback = function (error) {
  if (error) {
    console.log('Error:' + error);
  }
  Router.go('home');
};
