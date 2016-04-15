/* global Template, Session, sanitizeHtml, $ */
Template.adEditor.helpers({
  participa: function () { return Session.get('difuParticipar') ? 'difu-visible' : 'difu-hidden'; },
  dynPhoto: function () { return Session.get('dynPhoto'); },
  dynHeader: function () {
    return Session.get('dynHeader');
  },
  /* https://github.com/pfafman/meteor-photo-up */
  photoUpOptions: {
    loadImage: { maxWidth: 600, mixHeight: 500, cover: true, aspectRatio: 6 / 5 },
    showInfo: false,
    showClear: false,
    autoSelectOnJcrop: true,
    crop: true,
    jCrop: { setSelect: [0, 0, 300, 250], minSize: [300, 250], maxSize: [900, 750], aspectRatio: 6 / 5 },
    callback: function (error, photo) {
      if (error == null) {
        // console.log(photo.src);
        // in photo, the original photo (I think)
        Session.set('dynPhoto', photo.src);
      }
    }
  }
});

Template.adEditor.onCreated(function () {
  Session.set('difuParticipar', true);
  delete Session.keys['dynHeader'];
  delete Session.keys['dynPhoto'];
});

Template.adEditor.onRendered(function () {
  $('div.photo-up div i').addClass('fa fa-camera');
  $('div.photo-up div i').text('');
});

Template.adEditor.events({
  'change #participar': function (e) {
    Session.set('difuParticipar', e.target.checked);
  },
  'change #adtitle': function (e) {
    Session.set('dynHeader', sanitizeHtml(e.target.value));
  },
  'keyup #adtitle': function (e) {
    Session.set('dynHeader', sanitizeHtml(e.target.value));
  }
});
