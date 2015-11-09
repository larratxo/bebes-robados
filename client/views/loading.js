Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: '/images/logo100.png',
      backgroundColor: '#f2f2f2',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
  }
};

// http://tobiasahlin.com/spinkit/
var message = '<p class="loading-message">cargando</p>';
var spinner = '<div class="spinner"></div>';
