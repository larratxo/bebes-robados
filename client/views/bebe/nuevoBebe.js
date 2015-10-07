function getTVal(e, name) {
  return $(e.target).find('[name=' + name + ']').val();
}

Template.nuevoBebe.onRendered(function() {
  AutoForm.resetForm("nuevoBebeForm");
});

AutoForm.hooks({
  nuevoBebeForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      $.bootstrapGrowl("Submit");
      var id = Persons.insert(insertDoc);
      if (id !== null) {
        this.done();
        $.bootstrapGrowl("Guardado", {type: 'success', align: 'center'} );
        //        Router.go('bebePage', { _id: id });
        Router.go('personsList');
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    }
  }
});
