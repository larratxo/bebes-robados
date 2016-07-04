/* global Template _ aFilesCollection */

Template.photosGallery.helpers({
  tieneFotos: function () {
    var fotos = this.photos;
    return _.isArray(fotos) && fotos.length > 0;
  },
  fotos: function () {
    var fotosIds = this.photos;
    var fileCollection = aFilesCollection[this.collection];
    var fotos = fileCollection.collection.find({ _id: { $in: fotosIds } });
    // console.log(fotos.fetch()[0]);
    return fotos;
  }
});
