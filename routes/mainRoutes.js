Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Inicio -' + Meteor.App.NAME });
}, {name: 'home'});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
    this.stop();
  } else {
    this.next();
  }
}

// https://stackoverflow.com/questions/21204134/add-more-links-to-the-dropdown-menu-of-meteor-accounts-ui-bootstrap-3
var addSettings = function() {
  var user = Meteor.user();
  if (user && $('#login-buttons-open-change-settings').length === 0) {
    // Add settings menu if no exist
    $("#login-buttons-open-change-password").before('<button class="btn btn-default btn-block" id="login-buttons-open-change-settings"><i class="fa fa-cog"></i> Cambiar mis datos</button>');
    $('#login-buttons-open-change-settings').on( "click", function() {
      Router.go('userUpdate');
    });
  }
  this.next();
};

Router.onBeforeAction(addSettings);

Router.map(function() {
  this.route('personsList', { path: '/bebes' });
  this.route('nuevoBebe', { path: '/nuevoBebe' });
  this.route('underConstruction', { path: '/en-construccion' });
  this.route('quienesSomos', { path: '/quienesSomos' });
  this.route('userUpdate', { path: '/yo' });
  this.route('legal', { path: '/legal' });
  this.route('donaciones', { path: '/donaciones' });
  this.route('bebePage', {
    path: '/bebe/:_id',
    data: function() { return Persons.findOne(this.params._id); }
  });
});

// https://iron-meteor.github.io/iron-router/#hooks
// Router.before(requireLogin, {only: ['nuevoBebe', 'bebePage'] } );
