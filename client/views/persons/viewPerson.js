Template.viewPerson.onRendered(function() {
  Session.set("DocumentTitle", "Información sobre este un bebe");
});

Template.viewPerson.events({
  'click #person-form-submit': function (event) {
    event.preventDefault();
    // console.log(event);
    Router.go('bebePage', { _id: event.target.form._id.value });
  }
});
