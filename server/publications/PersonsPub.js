Meteor.publish('Persons', function () {
  return Persons.find();
});
