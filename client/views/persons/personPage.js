Template.bebePage.onRendered(function() {
  Session.set("DocumentTitle", "Edita un bebe");
});

AutoForm.hooks({
  editaBebeForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      update: function(error, result) {
        if (typeof error === "undefined") {
          $.bootstrapGrowl("Actualizado", {type: 'success', align: 'center'} );
          Router.go('personsList');
          AutoForm.resetForm("editaBebeForm");
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'} );
          console.log("Error updating " + error);
        }
      }
    }
  }
});
