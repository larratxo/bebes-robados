/* global personLabelHack:true */

// http://docs.meteor.com/#accounts_oncreateuser

personLabelHack = function() {
  $(".autoform-array-item-body > .form-group > label.control-label").text("");
  $(".autoform-array-item-body > .form-group > div .panel-default")
     .removeClass("panel");
  $(".autoform-add-item").addClass("btn-xs");
  $(".autoform-remove-item").addClass("btn-xs");
  $(".autoform-array-item-body > .form-group label.control-label").remove();
};

Template.usersForm.helpers({
  isEqual: function (type, otherType) {
    return type === otherType;
  }
});

Template.viewUser.onRendered( function() {
  Session.set("DocumentTitle", "Mis datos");
  personLabelHack();
  $(".autoform-add-item").click(personLabelHack());
});
Template.userUpdate.onRendered( function() {
  Session.set("DocumentTitle", "Mis datos");
  personLabelHack();
  $(".autoform-add-item").click(personLabelHack());
});

AutoForm.hooks({
  editUserForm: {
    after: {
      update: function(error) {
        if (typeof error === "undefined") {
          if (Meteor.user().profile.conServicioAceptadas === true) {
            $.bootstrapGrowl("Guardado", {type: 'success', align: 'center'} );
          }
          Router.go('home');
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'} );
          console.log("Error updating " + error);
        }
      }
    }
  }
});
