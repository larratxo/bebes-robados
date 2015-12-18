// https://stackoverflow.com/questions/13151879/publish-certain-information-for-meteor-users-and-more-information-for-meteor-use
// https://stackoverflow.com/questions/14802627/cannot-access-other-users-email-addresses-in-meteor-app

/* Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
}); */

var publicUserFields = {fields: {'emails': 1, "profile.name": 1, "profile.imagenes" : 1, "profile.redesSociales": 1 }};
var allUserFields = {fields: {'emails': 1, "profile": 1 }};

/*
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, publicUserFields);
}); */

var userAndImagesFromId = function (id, userFields) {
  check(id, String);
  if (id) {
    var user = Meteor.users.find({_id: id}, userFields);
    var images = Images.find({$query: {'metadata.owner': id}, $orderby: {uploadedAt: -1}});
    return [ images, user ];
  }
  return [];
}

Meteor.publish('userAndImages', function (id) {
  return userAndImagesFromId(id, publicUserFields);
});

Meteor.publish('myImages', function () {
  return Images.find({$query: {'metadata.owner': this.userId}, $orderby: {uploadedAt: -1}});
});
