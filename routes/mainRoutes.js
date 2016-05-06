/* global SubsManager, undef, Roles, Meteor, Persons, Router, SubsManager, SEO */

// https://iron-meteor.github.io/iron-router/

var subsManager = new SubsManager();

Router.route('/', {
  name: 'home',
  // title: '',
  action: function () {
    this.render('home');
  }, subscriptions: function () {
    return subsManager.subscribe('Persons');
  }
});

var requireLogin = function () {
  if (!Meteor.user()) {
    this.render('accessDenied');
    this.stop();
  } else {
    this.next();
  }
};

Router.map(function () {
  this.route('loading', { path: '/loading' }); // just for testing
  this.route('personsList', {
    path: '/bebes',
    title: 'Busca bebe o familia',
    waitOn: function () {
      return subsManager.subscribe('Persons');
    }
  });
  this.route('difusion', {
    path: '/difusion',
    title: 'Campañas de Difusión',
    waitOn: function () {
      return subsManager.subscribe('AdCampaigns');
    }
  });
  this.route('nuevoBebe', {
    path: '/nuevoBebe',
    title: 'Añade un bebe'
  }
            );
  this.route('underConstruction', { path: '/en-construccion', title: 'En construcción' });
  this.route('quienesSomos', { path: '/quienesSomos', title: 'Quienes somos' });

  this.route('userUpdate', {
    path: '/yo',
    title: 'Mis datos',
    waitOn: function () {
      return subsManager.subscribe('meAndMyImages');
    }
  });

  // TODO : quitar los ifs!!!!!
  this.route('viewUser', {
    path: '/persona/:_id',
    // title: 'Datos de familiar',
    waitOn: function () {
      return subsManager.subscribe('userAndImages', this.params._id);
    },
    data: function () {
      var username = Meteor.users.findOne({ username: this.params._id });
      if (undef(username)) {
        var user = Meteor.users.findOne({ _id: this.params._id });
        if (undef(user) || undef(user.username)) {
          return user;
        } else {
          this.redirect('/persona/' + user.username);
        }
      } else {
        return username;
      }
    }
  });
  this.route('legal', { path: '/legal', title: 'Información Legal' });
  this.route('donaciones', { path: '/donaciones', title: 'Donaciones' });
  this.route('contacto', { path: '/contacto', title: 'Contacto' });

  this.route('bebePage', {
    path: '/edita-bebe-id/:_id',
    title: 'Edita bebe',
    waitOn: function () {
      return subsManager.subscribe('personAndImages', this.params._id);
    },
    data: function () {
      return Persons.findOne(this.params._id);
    }
  });
  this.route('editPersonSlug', {
    path: '/edita-bebe/:slug',
    title: 'Edita bebe',
    data: function () {
      return Persons.findOne({slug: this.params.slug});
    }
  });
  this.route('viewPerson', {
    path: '/bebe-id/:_id',
    waitOn: function () {
      return subsManager.subscribe('personAndImages', this.params._id);
    },
    // title: 'Datos sobre bebe',
    data: function () {
      return Persons.findOne(this.params._id);
    }
  });
  this.route('viewPersonSlug', {
    path: '/bebe/:slug',
    // title: 'Datos sobre bebe',
    waitOn: function () {
      return subsManager.subscribe('personAndImagesViaSlug', this.params.slug);
    },
    data: function () {
      return Persons.findOne({slug: this.params.slug});
    }
  });

  this.route('admin', {
    path: '/admin',
    title: 'Administración',
    // template: 'accountsAdmin',
    template: 'bebeAdmin',
    onBeforeAction: function () {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else
      if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('Not an admin, redirecting');
        this.redirect('/');
      }
      this.next();
    },
    waitOn: function () {
      return [subsManager.subscribe('AdCampaigns'), subsManager.subscribe('Persons')];
    }
  });
  this.route('DifuAdmin', {
    path: '/difu-admin/',
    waitOn: function () {
      return subsManager.subscribe('AdCampaigns');
    }
  });
});

// Not used now
/*
var profileUpdated = function () {
  return moment(Meteor.user().profile.updatedAt).
    diff(Meteor.user().profile.createdAt, 'seconds') !== 0;
} */

// Router.onBeforeAction(requireLogin, {only: ['userUpdate'] } );
Router.onBeforeAction(requireLogin,
                      { only: ['nuevoBebe', 'bebePage', 'userUpdate'] });

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

// https://iron-meteor.github.io/iron-router/#hooks

Router.onAfterAction(function () {
  if (this.ready()) {
    Meteor.isReadyForSpiderable = true;
  }
});

// http://stackoverflow.com/questions/19882687/set-html-title-when-using-iron-router
Router.after(function () {
  if (typeof document !== 'undefined') {
    var newTitle;
    if (this.route.options.title) {
      newTitle = this.route.options.title + ' - ' + Meteor.App.NAME;
    } else {
      newTitle = Meteor.App.NAME;
    }
    document.title = newTitle;
    SEO.set({ title: newTitle });
  }
});
