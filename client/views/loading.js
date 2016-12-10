/* global Template Session TAPi18n window */

Template.loading.onRendered = function () {
  // http://tobiasahlin.com/spinkit/
  var message = '<p class="loading-message">' + TAPi18n.__('cargando') + '</p>';
  var spinner = '<div class="spinner"></div>';

  if (!Session.get('loadingSplash')) {
    this.loading = window.pleaseWait({
      logo: '/images/logo100.png',
      backgroundColor: '#f2f2f2',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.onDestroyed = function () {
  if (this.loading) {
    this.loading.finish();
  }
};
