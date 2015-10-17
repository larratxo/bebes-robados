// https://stackoverflow.com/questions/13151879/publish-certain-information-for-meteor-users-and-more-information-for-meteor-use
// https://stackoverflow.com/questions/14802627/cannot-access-other-users-email-addresses-in-meteor-app

Meteor.publish("allUsers", function () {
        return Meteor.users.find({});
    });
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1, "profile.name": 1 }});
});
