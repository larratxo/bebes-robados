/* global Template, Session, Router commentsHack */
Template.viewPerson.onRendered(function () {
  Session.set('DocumentTitle', 'Datos sobre bebe ' + this.data.nombreCompleto);
  // Session.set('DocumentTitle', 'Información sobre este bebe');

  setTimeout(commentsHack, 2000);
});

Template.viewPerson.events({
  'click #person-form-submit': function (event, template) {
    event.preventDefault();
    console.log(template.data);
    // console.log(event);
    if (typeof event.target.form.slug === 'string') {
      Router.go('editPersonSlug', { slug: template.data.slug });
    } else {
      Router.go('bebePage', { _id: template.data._id });
    }
  }
});
