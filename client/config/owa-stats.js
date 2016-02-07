Template.owa.helpers({
  owaUrl: function() {
    return Meteor.settings.public.owa && Meteor.settings.public.owa.owaUrl;
  },
  owaSiteId: function() {
    return Meteor.settings.public.owa && Meteor.settings.public.owa.owaSiteId;
  }
});
