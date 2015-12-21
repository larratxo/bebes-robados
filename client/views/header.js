Template.header.onRendered(function () {
});

Template.header.helpers({
    // check if user is an admin
    isAdminUser: isAdminUser()
})
