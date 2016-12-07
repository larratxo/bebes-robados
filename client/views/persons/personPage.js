/* global Template successWithTitle alertMessage Router AutoForm Persons */
Template.bebePage.onRendered(function () {

});

AutoForm.hooks({
  editaBebeForm: {
    before: {
      update: function (doc) {
        doc.$set.validated = false;
        return doc;
      }
    },
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      update: function (error, result) {
        if (typeof error === 'undefined') {
          successWithTitle(TAPi18n.__('Actualizado'), TAPi18n.__('Pendiente de moderación'));
          Router.go('personsList');
          AutoForm.resetForm('editaBebeForm');
        } else {
          alertMessage(error);
          console.log('Error updating ' + error);
        }
      }
    }
  }
});
