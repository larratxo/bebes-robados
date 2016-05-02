/* global $ Template Session AutoForm Router */

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
          $.bootstrapGrowl('Guardado', {type: 'success', align: 'center'});
          Router.go('difusion');
          AutoForm.resetForm('nuevoBebeForm');
          $('#usar').collapse('hide');
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'});
          console.log('Error inserting ' + error);
        }
      }
    }
  }
});
