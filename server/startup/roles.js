Meteor.startup(function () {
  // bootstrap the admin user if they exist -- You'll be replacing the id later

  if(!Meteor.roles.findOne({name: "admin"})) {
    Roles.createRole("admin");
  }

  /* No usado todavía
  if(!Meteor.roles.findOne({name: "denunciante"})) {
    Roles.createRole("denunciante");
  } */

  var adminId = Meteor.users.findOne({username: "admin"});
  if (adminId) {
    /* adminRole y authorRole se usa solo para el blog, admin es el rol general de administración */
    Roles.addUsersToRoles(adminId, ['admin', 'adminRole']);
  }

  /*
  Blog.config({
    adminRole: 'some-user',
    authorRole: 'somer-user'
  });
  */

});
