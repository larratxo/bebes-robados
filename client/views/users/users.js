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

Template.userGallery.helpers({
  images: function () {
    return userImages(this);
  },
  tieneFotos: function() {
    return userImages(this).count() > 0;
  }
});

Template.usersForm.helpers({
  isEqual: function (type, otherType) {
    return type === otherType;
  }
});

Template.viewUser.onRendered( function() {
  Session.set("DocumentTitle", "Mis datos");
  personLabelHack();
  $(".autoform-add-item").click(personLabelHack());

  $('#links').onclick = function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link, event: event},
        links = this.getElementsByTagName('a');
    blueimp.Gallery(links, options);
  };
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
          // Router.go('home');
        } else {
          $.bootstrapGrowl(error, {type: 'danger', align: 'center'} );
          console.log("Error updating " + error);
        }
      }
    }
  }
});
