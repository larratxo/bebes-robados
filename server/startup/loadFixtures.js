function loadFixture(fixtures, collection) {
  for (var i = 0; i < fixtures.length; i+= 1) {
    //collection.remove({ });
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function () {
  //loadFixture(Fixtures['dummyFixture'], DummyCollection);
  if (Persons.find().count() === 0) {
    console.log("Loading persons fixtures.");
    loadFixture(Fixtures.persons, Persons);
  } else {
    // console.log("Not loading persons fixtures.");
  }
});
