/* global Template, ReactiveVar, $, Meteor, AdCampaigns, Persons, _ UniHTML alertMessage success FileReader Blob */

var getAfectado = function () {
  return Persons.find({
    familiar: Meteor.userId()
  });
};

Template.registerHelper('afectado', function () {
  return Meteor.user() && getAfectado().count() >= 1;
});

Template.DifuEditor.helpers({
  participa: function () {
    return Template.instance().myAd.get().participate ? 'checked' : '';
  },
  participaClass: function () {
    return Template.instance().myAd.get().participate ? 'difu-visible' : 'difu-hidden';
  },
  noParticipaClass: function () {
    return Template.instance().myAd.get().participate ? 'difu-hidden' : 'difu-visible';
  },
  dynPhoto: function () {
    return Template.instance().myAd.get().photo;
  },
  dynHeader: function () {
    return Template.instance().myAd.get().text;
  },
  cropping: function () {
    return Template.instance().cropping.get();
  },
  notCropping: function () {
    return !Template.instance().cropping.get();
  }
});

Template.DifuEditor.onCreated(function () {
  var ad = AdCampaigns.findOne({
    user: Meteor.userId()
  });
  var casos = getAfectado();
  var count = casos.count();
  var afectado = count >= 1;
  if (typeof (ad) === 'undefined' && afectado) {
    var personSlug = casos.fetch()[0].slug;
    AdCampaigns.insert({
      user: Meteor.userId(),
      participate: false,
      validated: false,
      text: '',
      bebe: personSlug
    });
    ad = AdCampaigns.findOne({
      user: Meteor.userId()
    });
  }
  this.myAd = new ReactiveVar(ad);
  this.cropping = new ReactiveVar(false);
});

Template.DifuEditor.onRendered(function () {
});

var uploadCallback = function (error) {
  if (error) {
    alertMessage(error);
  } else {
    success('Guardado');
  }
};

var updateTextTh = _.throttle(function (id, newText) {
  AdCampaigns.update(id, {
    $set: {
      text: newText,
      validated: false
    }
  });
  // }, uploadCallback);
}, 4000);

var updateImg = _.throttle(function (id, imgCropped) {
  AdCampaigns.update(id, {
    $set: {
      photo: imgCropped,
      validated: false
    }
  }, uploadCallback);
}, 4000);

function refreshTitle (e, template, newText, save) {
  var myAd = template.myAd.get();
  myAd.text = newText;
  template.myAd.set(myAd);
  if (save) {
    updateTextTh(myAd._id, newText);
  }
}

Template.DifuEditor.events({
  'change #files': function (e, template) {
    // https://stackoverflow.com/questions/14069421/show-an-image-preview-before-upload
    var reader = new FileReader();
    reader.onload = function (e) {
      // get loaded data and render thumbnail.
      var imgCropSelector = $('#cropperimage');
      imgCropSelector.attr('src', e.target.result);
      imgCropSelector.cropper({
        viewMode: 0,
        autoCropArea: 0.7,
        aspectRatio: 6 / 5,
        /* autoCrop: false, */
        responsive: true,
        dragMode: 'move',
        minCropBoxWidth: 450,
        minCropBoxHeight: 375,
        // minCropBoxWidth: 300,
        // minCropBoxHeight: 250,
        background: false,
        crop: function (e) {
          template.cropping.set(true);
          var imgCropped = imgCropSelector.cropper('getCroppedCanvas').toDataURL();
          var myAd = template.myAd.get();
          myAd.photo = imgCropped;
          // TODO photoHD!!
          // myAd.photoHD = photo.img;
          // console.log("foto" + photo.img); Es un HTMLCanvasElement
          updateImg(myAd._id, imgCropped);
          template.myAd.set(myAd);
        }
      });
    };
    // read the image file as a data URL.
    // console.log(e.currentTarget.files);
    if (e.currentTarget.files[0] instanceof Blob) {
      reader.readAsDataURL(e.currentTarget.files[0]);
    }
  },
  'change #participar': function (e, template) {
    var myAd = template.myAd.get();
    myAd.participate = e.target.checked;
    template.myAd.set(myAd);
    AdCampaigns.update(myAd._id, {
      $set: {
        participate: e.target.checked,
        validated: false
      }
    });
  },
  'focusout #adtitle, change #adtitle': _.throttle(function (e, template) {
    refreshTitle(e, template, UniHTML.purify(e.target.value), true);
  }, 300),
  'keyup #adtitle': _.throttle(function (e, template) {
    refreshTitle(e, template, UniHTML.purify(e.target.value), false);
  }, 300)
});
