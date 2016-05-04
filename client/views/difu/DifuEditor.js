/* global Template, ReactiveVar, sanitizeHtml, $, Meteor, AdCampaigns, Persons */

var getAfectado = function () {
  return Persons.find({familiar: Meteor.userId()});
};

Template.registerHelper('afectado', function () {
  return Meteor.user() && getAfectado().count() >= 1;
});

Template.DifuEditor.helpers({
  participa: function () { return Template.instance().myAd.get().participate ? 'checked' : ''; },
  participaClass: function () { return Template.instance().myAd.get().participate ? 'difu-visible' : 'difu-hidden'; },
  noParticipaClass: function () { return Template.instance().myAd.get().participate ? 'difu-hidden' : 'difu-visible'; },
  dynPhoto: function () { return Template.instance().myAd.get().photo; },
  dynHeader: function () {
    return Template.instance().myAd.get().text;
  },
  /* https://github.com/pfafman/meteor-photo-up */
  photoUpOptions: function () {
    var templ = Template.instance();
    return {
      loadImage: { maxWidth: 600, mixHeight: 500, cover: true, aspectRatio: 6 / 5 },
      showInfo: false,
      showClear: false,
      autoSelectOnJcrop: true,
      crop: true,
      jCrop: { setSelect: [0, 0, 600, 500], minSize: [450, 375], maxSize: [900, 750], aspectRatio: 6 / 5 },
      callback: function (error, photo) {
        if (error == null) {
          var myAd = templ.myAd.get();
          myAd.photo = photo.src;
          myAd.photoHD = photo.img;
          // console.log("foto" + photo.img); Es un HTMLCanvasElement
          AdCampaigns.update(myAd._id, {$set: {photo: photo.src, validated: false}});
          templ.myAd.set(myAd);
        }
      }
    };
  }
});

Template.DifuEditor.onCreated(function () {
  var ad = AdCampaigns.findOne({user: Meteor.userId()});
  var casos = getAfectado();
  var count = casos.count();
  var afectado = count >= 1;
  if (typeof (ad) === 'undefined' && afectado) {
    var personSlug = casos.fetch()[0].slug;
    AdCampaigns.insert({ user: Meteor.userId(), participate: false, validated: false, text: '', bebe: personSlug });
    ad = AdCampaigns.findOne({user: Meteor.userId()});
  }
  this.myAd = new ReactiveVar(ad);
});

Template.DifuEditor.onRendered(function () {
  $('div.photo-up div i').addClass('fa fa-camera');
  $('div.photo-up div i').text('');
});

Template.DifuEditor.events({
  'change #participar': function (e, template) {
    var myAd = template.myAd.get();
    myAd.participate = e.target.checked;
    template.myAd.set(myAd);
    AdCampaigns.update(myAd._id, {$set: {participate: e.target.checked, validated: false}});
  },
  'change #adtitle': function (e, template) {
    var newText = sanitizeHtml(e.target.value);
    var myAd = template.myAd.get();
    myAd.text = newText;
    template.myAd.set(myAd);
    AdCampaigns.update(myAd._id, {$set: {text: newText, validated: false}});
  },
  'keyup #adtitle': function (e, template) {
    var newText = sanitizeHtml(e.target.value);
    var myAd = template.myAd.get();
    myAd.text = newText;
    template.myAd.set(myAd);
  }
});