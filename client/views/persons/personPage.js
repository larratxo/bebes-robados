/* global Template successWithTitle alertMessage Router AutoForm Persons */
Template.bebePage.onRendered(function () {

});

AutoForm.hooks({
  editaBebeForm: {
    before: {
      formType: function (doc) {
        Persons.update(doc._id, {$set: {validated: false}});
      }
    },
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      update: function (error, result) {
        if (typeof error === 'undefined') {
          successWithTitle('Actualizado', 'Pendiente de moderación');
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
