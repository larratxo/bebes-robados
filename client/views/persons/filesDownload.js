/* global Template ReactiveVar aFilesCollection _ */
Template.filesDownload.onCreated(function () {
  this.collection = new ReactiveVar(aFilesCollection[this.data.collection]);
});

Template.filesDownload.helpers({
  files: function () {
    var array = Template.instance().data.uploadedFiles;
    var hasFiles = _.isArray(array) && array.length > 0;
    if (hasFiles) {
      if (typeof array[0] === 'string') {
        return Template.instance().collection.get().find({ _id: { $in: array } });
      } else {
        return array;
      }
    }
    return [];
  },
  fileLink: function (fileRef) {
    return Template.instance().collection.get().link(fileRef);
  }
});
