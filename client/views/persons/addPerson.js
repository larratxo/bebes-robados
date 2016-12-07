/* global $ Template successWithTitle alertMessage AutoForm Router TAPi18n */

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
          successWithTitle(TAPi18n.__('Guardado'), TAPi18n.__('Pendiente de moderación'));
          Router.go('viewPerson', {_id: result});
          // Antes íbamos a nuestro perfil:
          // Router.go('userUpdate');
          // AutoForm.resetForm('nuevoBebeForm');
          // $('#usar').collapse('hide');
          // _.delay(function () { $('body').animate({ scrollTop: $('#casosreportados').offset().top - 100 }, 1000); }, 1000);
        } else {
          alertMessage(error);
          console.log('Error inserting ' + error);
        }
      }
    }
  }
});
