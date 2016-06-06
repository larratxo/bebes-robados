/* global Persons Meteor userImages personAttachs check Roles */
Meteor.publish('Persons', function () {
  var isAdmin = Roles.userIsInRole(this.userId, ['admin']);
  if (isAdmin) {
    return Persons.find();
  } else {
    return Persons.find({validated: true});
  }
});

// https://github.com/CollectionFS/Meteor-CollectionFS#storing-fsfile-references-in-your-objects
Meteor.publish('personAndImages', function (id) {
  check(id, String);
  var person = Persons.find({_id: id});
  if (person.count() > 0) {
    var familiar = person.fetch()[0].familiar;
    check(familiar, String);
    var userFamiliar = Meteor.users.find({_id: familiar});
    return [
      person,
      userFamiliar,
      userImages(userFamiliar.fetch()[0]),
      personAttachs(person.fetch()[0], this.userId)
    ];
  } else {
    // empty cursor
    return Persons.find({limit: 0});
  }
});

Meteor.publish('personAndImagesViaSlug', function (slug) {
  check(slug, String);
  var person = Persons.find({slug: slug});
  if (person.count() > 0) {
    var familiar = person.fetch()[0].familiar;
    check(familiar, String);
    var userFamiliar = Meteor.users.find({_id: familiar});
    return [
      person,
      userFamiliar,
      userImages(userFamiliar.fetch()[0]),
      personAttachs(person.fetch()[0], this.userId)
    ];
  } else {
    // empty cursor
    return Persons.find({limit: 0});
  }
});
