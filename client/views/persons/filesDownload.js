/* global Template ReactiveVar aFilesCollection */
Template.filesDownload.onCreated(function () {
  this.collection = new ReactiveVar(aFilesCollection[this.data.collection]);
});

Template.filesDownload.helpers({
  fileLink: function (fileRef) {
    return Template.instance().collection.get().link(fileRef);
  }
});
