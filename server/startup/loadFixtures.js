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
