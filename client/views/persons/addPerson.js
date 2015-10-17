function getTVal(e, name) {
  return $(e.target).find('[name=' + name + ']').val();
}

Template.nuevoBebe.onRendered(function() {
  // Commented, this clear default values
  // AutoForm.resetForm("nuevoBebeForm");
  Session.set("DocumentTitle","Añade un bebe");
});


AutoForm.hooks({
  nuevoBebeForm: {
    after: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      insert: function(error, result) {
        if (typeof error === "undefined") {
          $.bootstrapGrowl("Guardado", {type: 'success', align: 'center'} );
          Router.go('personsList');
          AutoForm.resetForm("nuevoBebeForm");
          // Router.go('bebePage', { _id: id });
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'} );
          console.log("Error inserting " + error);
        }
      }
    }
  }
});
