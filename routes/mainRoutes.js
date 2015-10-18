/*global Accounts */
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

if (Meteor.isClient) {
  $("#login-dropdown-list").click(addSettings);
}

Router.onBeforeAction(addSettings);

Router.map(function() {
  this.route('personsList', { path: '/bebes' });
  this.route('nuevoBebe', { path: '/nuevoBebe' });
  this.route('underConstruction', { path: '/en-construccion' });
  this.route('quienesSomos', { path: '/quienesSomos' });
    this.route('userUpdate', { path: '/yo',
			       waitOn: function() {
				   return Meteor.subscribe('images');
			       }
			     });
  this.route('viewUser', {
    path: '/persona/:_id',
    data: function() {
      return Meteor.users.findOne({_id: this.params._id });
    }
  });
  this.route('legal', { path: '/legal' });
  this.route('donaciones', { path: '/donaciones' });
  this.route('bebePage', {
    path: '/edita-bebe/:_id',
    data: function() {
      return Persons.findOne(this.params._id);
    }
  });
  this.route('viewPerson', {
    path: '/bebe/:_id',
    data: function() {
      return Persons.findOne(this.params._id);
    }
  });
});

var mustAcceptConds = function() {
  if (Meteor.user() && !Meteor.user().profile.conServicioAceptadas) {
    // Compare if just created
    if (moment(Meteor.user().profile.updatedAt).diff(Meteor.user().profile.createdAt, "seconds") !== 0) {
      $.bootstrapGrowl("Debe aceptar las condiciones de servicio", {type: 'danger', align: 'center'} );
    }
    Router.go('userUpdate');
    this.stop();
  } else {
    this.next();
  }
};

if (Meteor.isClient) {
  Accounts.onLogin(function () {
    if (Meteor.user().profile.createdAt === Meteor.user().profile.updatedAt) {
      Router.go('userUpdate');
    }
  });
};

Router.onBeforeAction(mustAcceptConds, {except: ['userUpdate']});
Router.onBeforeAction(requireLogin, {only: ['userUpdate'] } );
// Router.onBeforeAction(requireLogin, {only: ['nuevoBebe', 'bebePage', 'userUpdate'] } );

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

// https://iron-meteor.github.io/iron-router/#hooks
