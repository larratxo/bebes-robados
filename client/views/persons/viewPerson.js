Template.viewPerson.onRendered(function() {
  Session.set("DocumentTitle", "Información sobre este un bebe");
});

Template.viewPerson.events({
  'submit form': function (event) {
    event.preventDefault();
    // console.log(event);
    Router.go('bebePage', { _id: event.target._id.value });
  }
});
