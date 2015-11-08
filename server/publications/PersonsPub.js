Meteor.publish('Persons', function () {
  return Persons.find();
});

// https://github.com/CollectionFS/Meteor-CollectionFS#storing-fsfile-references-in-your-objects
Meteor.publish('personAndImages', function (id) {
  check(id, String);
  var person = Persons.find({_id: id});
  if (person.count() > 0) {
    var familiar = person.fetch()[0].familiar;
    check(familiar, String);
    var userFamiliar = Meteor.users.findOne({_id: familiar});
    return [
      person,
      userImages(userFamiliar)
    ];
  } else {
    // empty cursor
    return Persons.find({limit: 0});
  }
});


Meteor.publish('userAndImages', function (id) {
  check(id, String);
  var user = Meteor.users.find({_id: id});
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
