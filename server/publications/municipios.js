Meteor.publish('Municipios', function () {
  return Municipios.find();
});
