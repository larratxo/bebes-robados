/* global $ Template success alertMessage AutoForm Router */

Template.nuevoBebe.onRendered(function () {
  // Commented, this clear default values
  // AutoForm.resetForm('nuevoBebeForm');
});

AutoForm.hooks({
  nuevoBebeForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      insert: function (error, result) {
        if (typeof error === 'undefined') {
          success('Guardado');
          Router.go('difusion');
          AutoForm.resetForm('nuevoBebeForm');
          $('#usar').collapse('hide');
        } else {
          alertMessage(error);
          console.log('Error inserting ' + error);
        }
      }
    }
  }
});
