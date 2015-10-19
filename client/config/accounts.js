Accounts.ui.config ({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  forceEmailLowercase: true,
  forceUsernameLowercase: true,
  extraSignupFields: [
    {
      fieldName: 'name',
      fieldLabel: 'Nombre completo',
      inputType: 'text',
      visible: true
    }, {
    fieldName: 'conServicioAceptadas',
    fieldLabel: 'Acepto las condiciones de servicio de este sitio',
    inputType: 'checkbox',
    visible: true,
    saveToProfile: false,
    validate: function(value, errorFunction) {
      if (value) {
        return true;
      } else {
        errorFunction('Debes aceptar las condiciones de servicio de este sitio.');
        return false;
      }
    }
  }]
});

/* Normal account-ui
Meteor.logout(function(err) {
  Router.go('/');
});
*/

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Router.go('home');
}
