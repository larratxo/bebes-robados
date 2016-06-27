/* global Template, _,  */

Template.photosGallery.helpers({
  images: function () {
    return this.doc.photos;
  },
  tieneFotos: function () {
    var fotos = this.doc.photos;
    return _.isArray(fotos) && fotos.length > 0;
  }
});
