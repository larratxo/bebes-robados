// https://stackoverflow.com/questions/21204134/add-more-links-to-the-dropdown-menu-of-meteor-accounts-ui-bootstrap-3
var addSettings = function() {
  var user = Meteor.user();
  if (user && $('#login-buttons-open-change-settings').length === 0) {
    // Add settings menu if no exist
    $("#login-buttons-open-change-password").before('<button class="btn btn-default btn-block" id="login-buttons-open-change-settings"><i class="fa fa-cog"></i> Cambiar mis datos</button>');
    $('#login-buttons-open-change-settings').on( "click", function() {
      Router.go('userUpdate');
    });
  }
  // this.next();
};

// Router.onBeforeAction(addSettings);

Template.header.onRendered(function () {
    $("#login-dropdown-list").click(addSettings);
});
