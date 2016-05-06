/* global Template, Session, Router commentsHack */
Template.viewPerson.onRendered(function () {
  Session.set('DocumentTitle', 'Datos sobre bebe ' + this.data.nombreCompleto);
  // Session.set('DocumentTitle', 'Información sobre este bebe');

  setTimeout(commentsHack, 2000);
});

Template.viewPerson.events({
  'click #person-form-submit': function (event) {
    event.preventDefault();
    // console.log(event);
    if (typeof event.target.form.slug === 'string') {
      Router.go('editPersonSlug', { slug: event.target.form.slug.value });
    } else {
      Router.go('bebePage', { _id: event.target.form._id.value });
    }
  }
});
