/* global Meteor,userImages,Images */
Meteor.publish('images', function (user) {
  return userImages(user)
})

Meteor.publish('allImages', function () {
  // return Images.find('{limit: 0}');
  return Images.find()
})
