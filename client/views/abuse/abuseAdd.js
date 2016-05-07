/* global Template Autoform success alertMessage Router */
Template.abuseAdd.helpers({
  username: function () { return this.data.username; }
});

AutoForm.hooks({
  addAbuseForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      insert: function (error, result) {
        if (typeof error === 'undefined') {
          success('Informe de abuso guardado');
          Router.go('home');
          AutoForm.resetForm('addAbuseForm');
          $('#usar').collapse('hide');
        } else {
          alertMessage(error);
          console.log('Error inserting ' + error);
        }
      }
    }
  }
});
