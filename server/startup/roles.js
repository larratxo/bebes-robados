Meteor.startup(function () {
  // bootstrap the admin user if they exist -- You'll be replacing the id later

  if(!Meteor.roles.findOne({name: "admin"})) {
    Roles.createRole("admin");
  }

  if(!Meteor.roles.findOne({name: "editor"})) {
    Roles.createRole("editor");
  }

  var adminId = Meteor.users.findOne({username: "admin"});
  if (adminId) {
    Roles.addUsersToRoles(adminId, ['admin', 'admin']);
  }

});
