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
    var userFamiliar = Meteor.users.find({_id: familiar});
    return [
      person,
      userFamiliar,
      userImages(userFamiliar.fetch()[0]),
      personAttachs(person.fetch()[0])
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
      personAttachs(person.fetch()[0])
    ];
  } else {
    // empty cursor
    return Persons.find({limit: 0});
  }
});

/*
var personAttachs = function (person) {
  if (person) {
    // FIXME
    // var attachs = Attachs.find({});
    var attachs = Attachs.find({'metadata.owner': person._id});
    return attachs;
  } else {
    console.log('Person not found');
    return [];
  }
};
*/
