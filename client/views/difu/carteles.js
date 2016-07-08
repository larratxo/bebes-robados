/* global Template siteSettings */

Template.carteles.onRendered(function () {
});

Template.carteles.helpers({
  sitedomain: function () {
    return siteSettings.get('site-domain');
  }
});
