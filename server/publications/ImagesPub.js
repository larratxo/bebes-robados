Meteor.publish('images', function (user) {
  return userImages(user);
});
