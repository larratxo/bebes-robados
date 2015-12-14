/*global Accounts */

// https://iron-meteor.github.io/iron-router/

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

  this.route('userUpdate', { path: '/yo', waitOn: function() { return Meteor.subscribe('allImages'); }});

  // TODO : quitar los ifs!!!!!
  this.route('viewUser', {
    path: '/persona/:_id',
    waitOn: function() {
      return Meteor.subscribe('userAndImages', this.params._id);
    },
    data: function() {
      var username = Meteor.users.findOne({username: this.params._id });
      //console.log("persona id: "+ this.params._id);
      //console.log("persona username: "+ username);
      if (undef(username)) {
        var user = Meteor.users.findOne({_id: this.params._id });
        //console.log("persona user: " + user);
        if (undef(user) || undef(user.username)) {
          return user;
        }
        else {
          //console.log("persona redirecting to " + user.username);
          this.redirect('/persona/' + user.username);
        }
      }
      else {
        return username;
      }
    }
  });
  this.route('legal', { path: '/legal' });
  this.route('donaciones', { path: '/donaciones' });

  this.route('bebePage', {
    path: '/edita-bebe-id/:_id',
    waitOn: function() {
      return Meteor.subscribe('Municipios');
    },
    data: function() {
      return Persons.findOne(this.params._id);
    }
  });
  this.route('editPersonSlug', {
    waitOn: function() {
      return Meteor.subscribe('Municipios');
    },
    path: '/edita-bebe/:slug',
    data: function() {
      return Persons.findOne({slug: this.params.slug});
    }
  });
  this.route('viewPerson', {
    path: '/bebe-id/:_id',
    waitOn: function() {
      return Meteor.subscribe('personAndImages', this.params._id);
    },
    data: function() {
      return Persons.findOne(this.params._id);
    }
  });
  this.route('viewPersonSlug', {
    path: '/bebe/:slug',
    waitOn: function() {
      return Meteor.subscribe('personAndImagesViaSlug', this.params.slug);
    },
    data: function() {
      return Persons.findOne({slug: this.params.slug});
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
