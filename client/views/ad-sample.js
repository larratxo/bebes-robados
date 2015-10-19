Template.adSample.helpers({
  photoUpOptions: {
    loadImage: {width: 300, height: 250, aspectRatio: 6/5 },
    crop: true,
    jCrop: {minSize: [300, 250], maxSize: [900, 750], aspectRatio: 6/5 },
    callback: function (error, photo) {
      console.log(photo);
    }
  }
});
