function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
    console.log("Creating user " + user.username);
  }
}

function loadFixture(fixtures, collection) {
  for (var i = 0; i < fixtures.length; i+= 1) {
    //collection.remove({ });
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (var key in users) {
    if (users.hasOwnProperty(key)) {
      loadUser(users[key]);
    }
  }

  var testUserId = Meteor.users.findOne( { username : "test" } )._id;

  if (Persons.find().count() === 0) {
    console.log("Loading persons fixtures for user " + testUserId);
    loadFixture(Fixtures.persons, Persons);
    Persons.update({}, {$set: {familiar: testUserId}}, { multi: true });
  } else {
    console.log("Not loading persons fixtures.");
  }
  if (Provincias.find().count() === 0) {
    console.log("Loading provinces fixtures.");
    var p = Fixtures.provincias;
    for (var i = 0; i < p.length; i+= 1) {
      Provincias.insert({"code": parseInt(p[i].code), "name": p[i].name});
    }
  }
  if (Municipios.find().count() === 0) {
    console.log("Loading municipes fixtures.");
    var m = Fixtures.municipios;
    for (var i = 0; i < m.length; i+= 1) {
      Municipios.insert({cod_id: parseInt(m[i].id), cod_prov : parseInt(m[i].cod_prov), cod_mun : parseInt(m[i].cod_mun), name: m[i].name });
    }
  }

});
