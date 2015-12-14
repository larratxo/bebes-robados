// https://stackoverflow.com/questions/13151879/publish-certain-information-for-meteor-users-and-more-information-for-meteor-use
// https://stackoverflow.com/questions/14802627/cannot-access-other-users-email-addresses-in-meteor-app

Meteor.publish("allUsers", function () {
        return Meteor.users.find({});
    });
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'emails': 1, "profile.name": 1, "profile.imagenes" : 1, "profile.redesSociales": 1 }});
});

Meteor.publish('userAndImages', function (id) {
  check(id, String);
  var user;
  user = Meteor.users.find({username: id});
  if (user.count() === 0) {
    user = Meteor.users.find({_id: id});
  }
  if (user.count() > 0) {
    return [
      user,
      userImages(user.fetch()[0])
    ];
  } else {
    // empty cursor
    return Meteor.users.find({limit: 0});
  }
});
