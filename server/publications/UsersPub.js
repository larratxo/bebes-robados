// https://stackoverflow.com/questions/13151879/publish-certain-information-for-meteor-users-and-more-information-for-meteor-use
// https://stackoverflow.com/questions/14802627/cannot-access-other-users-email-addresses-in-meteor-app

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});

var publicUserFields = {fields: {"emails": 1, "username": 1, "profile.name": 1, "profile.imagenes" : 1, "profile.redesSociales": 1 }};

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, publicUserFields);
});

var userAndImagesFromId = function (username, userFields) {
  check(username, String);
  if (username) {
    var user = Meteor.users.find({username: username}, userFields);
    var images = Images.find({$query: {'metadata.owner': user._id}, $orderby: {uploadedAt: -1}});
    return [ images, user ];
  } else {
    return [];
  }
}

Meteor.publish('userAndImages', function (username) {
  return userAndImagesFromId(username, publicUserFields);
});

Meteor.publish('myImages', function () {
  return Images.find({$query: {'metadata.owner': this.userId}, $orderby: {uploadedAt: -1}});
});
