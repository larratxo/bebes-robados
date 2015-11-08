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

var profImages = function(user) {
  // Use instead: https://atmospherejs.com/meteorhacks/subs-manager
  return Meteor.subscribe('images', user);
}

Router.map(function() {
  this.route('loading', { path: '/loading' }); // just for testing
  this.route('personsList', { path: '/bebes',
                              waitOn: function() {
                                // Use instead: https://atmospherejs.com/meteorhacks/subs-manager
                                return Meteor.subscribe('Persons');
			      }
  });
  this.route('adSample', { path: '/ad-sample' }); // just for testing
  this.route('nuevoBebe', { path: '/nuevoBebe' });
  this.route('underConstruction', { path: '/en-construccion' });
  this.route('quienesSomos', { path: '/quienesSomos' });
  this.route('userUpdate', { path: '/yo', waitOn: function() { return profImages(Meteor.user()); } });
  this.route('viewUser', {
    path: '/persona/:_id',
    waitOn: function() {
      return profImages(Meteor.users.findOne({_id: this.params._id }));
    },
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
    waitOn: function() {

      var person = Persons.findOne(this.params._id);

      return profImages(Meteor.users.findOne(  {_id: person.familiar }));
    },
    data: function() {
      return Persons.findOne(this.params._id);
    }
  });
});

// Not used now
var profileUpdated = function () {
  return moment(Meteor.user().profile.updatedAt).diff(Meteor.user().profile.createdAt, "seconds") !== 0;
}

// Router.onBeforeAction(requireLogin, {only: ['userUpdate'] } );
Router.onBeforeAction(requireLogin, {only: ['nuevoBebe', 'bebePage', 'userUpdate'] } );

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

// https://iron-meteor.github.io/iron-router/#hooks
