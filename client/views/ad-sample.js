Template.adSample.helpers({
  dynPhoto: function() { Session.get("dynPhoto"); },
  photoUpOptions: {
    loadImage: {width: 300, height: 250, aspectRatio: 6/5 },
    crop: true,
    jCrop: {setSelect: [0, 0, 300, 250], minSize: [300, 250], maxSize: [900, 750], aspectRatio: 6/5 },
    callback: function (error, photo) {
      // console.log(photo.src);
      Session.set("dynPhoto");
    }
  }
});
