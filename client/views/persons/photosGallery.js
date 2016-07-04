/* global Template _ aFilesCollection */

function hasPhotos (fotosIds) {
  var has = _.isArray(fotosIds) && fotosIds.length > 0;
  // console.log('Has photos: ' + has);
  return has;
}

Template.photosGallery.helpers({
  tieneFotos: function () {
    var fotosIds = this.photos;
    return hasPhotos(fotosIds);
  },
  fotos: function () {
    var fotosIds = this.photos;
    if (hasPhotos(fotosIds)) {
      var fileCollection = aFilesCollection[this.collection];
      var fotos = fileCollection.collection.find({ _id: { $in: fotosIds } });
      // console.log(fotos.fetch()[0]);
      return fotos;
    }
    return [];
  }
});
