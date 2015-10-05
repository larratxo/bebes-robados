Meteor.publish('notes', function () {
  return notes.find();
});
