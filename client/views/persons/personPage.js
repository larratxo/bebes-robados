Template.bebePage.onRendered(function () {

});

AutoForm.hooks({
  editaBebeForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      update: function(error, result) {
        if (typeof error === "undefined") {
          success('Actualizado');
          Router.go('personsList');
          AutoForm.resetForm("editaBebeForm");
        } else {
          alert(error);
          console.log("Error updating " + error);
        }
      }
    }
  }
});
