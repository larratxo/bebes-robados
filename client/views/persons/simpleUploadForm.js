/* global Template ReactiveVar Photos alertMessage success */

Template.simpleUploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.simpleUploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.simpleUploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Photos.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alertMessage('Error subiendo fichero: ' + error);
        } else {
          success('Fichero "' + fileObj.name + '" subido correctamente');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});
