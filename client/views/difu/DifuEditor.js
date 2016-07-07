/* global Template, ReactiveVar, $, Meteor, AdCampaigns, Persons, _ UniHTML alertMessage success FileReader Blob */
import 'cropper/dist/cropper.min.css';
import cropper from 'cropper';

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
    // success('Guardado');
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

// https://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript
var findPos = function (obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj === obj.offsetParent);
    return [curtop];
  }
};

Template.DifuEditor.events({
  'click button.rotar45': function (e, template) {
    $('#cropperimage').cropper('rotate', 45);
  },
  'click button.rotar-45': function (e, template) {
    $('#cropperimage').cropper('rotate', -45);
  },
  'click button.crop': function (e, template) {
    $('#cropperimage').cropper('setDragMode', 'crop');
  },
  'click button.move': function (e, template) {
    $('#cropperimage').cropper('setDragMode', 'move');
  },
  'click button.zoom-out': function (e, template) {
    $('#cropperimage').cropper('zoom', -0.1);
  },
  'click button.zoom-in': function (e, template) {
    $('#cropperimage').cropper('zoom', 0.1);
  },
  'click button.save': function (e, template) {
    success('Guardado');
    if ($('.modal.difumodal').is(':visible')) {
      $('.modal.difumodal').animate({ scrollTop: $('#difueditor').offset().top - 100 }, 1000);
    } else {
      $('body').animate({ scrollTop: $('#difueditor').offset().top - 100 }, 1000);
    }
  },
  'change #files': function (e, template) {
    // https://stackoverflow.com/questions/14069421/show-an-image-preview-before-upload
    var reader = new FileReader();
    reader.onload = function (e) {
      // get loaded data and render thumbnail.
      var imgCropSelector = $('#cropperimage');
      if (template.cropping.get()) {
        // Replace with new image
        imgCropSelector.cropper('replace', e.target.result);
      } else {
        imgCropSelector.attr('src', e.target.result);
      }
      imgCropSelector.cropper({
        viewMode: 0,
        // autoCropArea: 0.7,
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
      if ($('.modal.difumodal').is(':visible')) {
        // No va bien $('.modal.difumodal').animate({ scrollTop: $('#cropper-btns').offset().top }, 1000);
      } else {
        $('html, body').animate({ scrollTop: $('#cropper-btns').offset().top }, 1000);
      }
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
