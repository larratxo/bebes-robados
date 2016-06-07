/* global Meteor, currentAdCampaign, Images, AdCampaigns, check, Persons */
 // https://stackoverflow.com/questions/13151879/publish-certain-information-for-meteor-users-and-more-information-for-meteor-use
// https://stackoverflow.com/questions/14802627/cannot-access-other-users-email-addresses-in-meteor-app

Meteor.publish('allUsers', function () {
  return Meteor.users.find({});
});

var publicUserFields = {fields: {'emails': 1, 'username': 1, 'profile.name': 1, 'profile.imagenes': 1, 'profile.redesSociales': 1}};

var allUserFields = {fields: {'emails': 1, 'username': 1, 'profile.dni': 1, 'profile.name': 1, 'profile.imagenes': 1, 'profile.redesSociales': 1}};

Meteor.publish('allUserData', function () {
  return Meteor.users.find({}, publicUserFields);
});

var userAndImagesFromId = function (user) {
  if (user) {
    var images = Images.find({'metadata.owner': user._id}); // , {sort: [[uploadedAt, 'desc' ]]});
    // console.log('User images via metadata: ' + images.count());
    return [ images, user ];
  } else {
    console.log('User not found');
    return [];
  }
};

Meteor.publish('userAndImages', function (username) {
  check(username, String);
  var user;
  user = Meteor.users.find({username: username}, publicUserFields);
  if (user.count() === 0) {
    user = Meteor.users.find({_id: username}, publicUserFields);
  }
  if (user.count() > 0) {
    var persons = Persons.find({familiar: user.fetch()[0]._id});
    return userAndImagesFromId(user).concat([persons]);
  }
  return userAndImagesFromId(user);
});

Meteor.publish('meAndMyImages', function () {
  // check(this.userId, String); // sometimes this is 'object'
  var user = Meteor.users.find({_id: this.userId}, allUserFields);
  var ad = AdCampaigns.find({ group: currentAdCampaign,
                              user: this.userId });
  var persons = Persons.find({familiar: this.userId});
  return userAndImagesFromId(user).concat([ad, persons]);
});
