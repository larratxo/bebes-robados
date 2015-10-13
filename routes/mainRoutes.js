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
