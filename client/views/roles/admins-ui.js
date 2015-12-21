isAdminUser = function() {
        return Roles.userIsInRole(Meteor.user(), ['admin']);
}

Template.adminTemplate.helpers({
    // check if user is an admin
    isAdminUser: isAdminUser()
})
