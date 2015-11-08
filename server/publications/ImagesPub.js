Meteor.publish('images', function (user) {
  return userImages(user);
});

Meteor.publish('allImages', function (user) {
  return Images.find();
});
