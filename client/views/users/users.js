/*global Accounts */
// http://docs.meteor.com/#accounts_oncreateuser

Accounts.onLogin(function () {
  // if (undef(Meteor.user().profile.dni)) {
  //  Router.go('userUpdate');
  // }
});

AutoForm.hooks({
  userUpdate: {
    after: {
      update: function(error) {
        if (typeof error === "undefined") {
          $.bootstrapGrowl("Guardado", {type: 'success', align: 'center'} );
          Router.go('home');
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'} );
          console.log("Error updating " + error);
        }
      }
    }
  }
});
