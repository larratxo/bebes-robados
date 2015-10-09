Template.nuevoBebe.onRendered(function() {
  AutoForm.resetForm("editaBebeForm");
});


AutoForm.hooks({
  editaBebeForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      update: function(error, result) {
        if (error === undefined) {
          $.bootstrapGrowl("Actualizado", {type: 'success', align: 'center'} );
          Router.go('personsList');
          AutoForm.resetForm("editaBebeForm");
        } else {
          $.bootstrapGrowl("Error salvando, " + error, {type: 'danger', align: 'center'} );
          console.log("Error updating " + error);
        }
      }
    }
  }
});
