/* global Template, Session, Router commentsHack success Persons*/
Template.viewPerson.onRendered(function () {
  Session.set('DocumentTitle', 'Datos sobre bebe ' + this.data.nombreCompleto);
  // Session.set('DocumentTitle', 'Información sobre este bebe');

  setTimeout(commentsHack, 2000);
});

Template.viewPerson.events({
  'click #person-form-publicar': function (e, template) {
    e.currentTarget.disabled = true;
    var value = !this.doc.validated;
    Persons.update(this.doc._id, {$set: {validated: value}}, function () {
      success(value ? 'Publicado' : 'No publicado');
      e.currentTarget.disabled = false;
    });
    e.stopImmediatePropagation();
  },
  'click #person-form-submit': function (event, template) {
    event.preventDefault();
    // console.log(template.data);
    // console.log(event);
    if (typeof event.target.form.slug === 'string') {
      Router.go('editPersonSlug', { slug: template.data.slug });
    } else {
      Router.go('bebePage', { _id: template.data._id });
    }
  }
});
