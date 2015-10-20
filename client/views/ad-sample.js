Template.adSample.helpers({
  participa: function() { return Session.get("difuParticipar")? "difu-visible": "difu-hidden" ; },
  dynPhoto: function() { return Session.get("dynPhoto"); },
  dynHeader: function() {
    return Session.get("dynHeader");
  },
  photoUpOptions: {
    loadImage: {maxWidth: 600, mixHeight: 500, cover: true },
    showInfo: false,
    showClear: false,
    autoSelectOnJcrop: true,
    crop: true,
    jCrop: {setSelect: [0, 0, 300, 250], minSize: [300, 250], maxSize: [900, 750], aspectRatio: 6/5 },
    callback: function (error, photo) {
      // console.log(photo.src);
      Session.set("dynPhoto", photo.src);
    }
  }
});

Template.adSample.onCreated(function () {
  Session.set('difuParticipar', true);
  delete Session.keys['dynHeader'];
  delete Session.keys['dynPhoto'];
});

Template.adSample.onRendered(function () {
  $("div.photo-up div i").addClass("fa fa-camera");
  $("div.photo-up div i").text("");
})

Template.adSample.events({
  'change #participar': function (e) {
    Session.set('difuParticipar', e.target.checked);
  },
  'change #adtitle': function (e) {
    Session.set('dynHeader', e.target.value);
  },
  'keyup #adtitle': function (e) {
    Session.set('dynHeader', e.target.value);
  }
});
