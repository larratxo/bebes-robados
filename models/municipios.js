Schema.Municipios = new SimpleSchema({
  cod_id: { type: Number, optional: false, index: 1 },
  cod_prov: { type: Number, optional: false, index: 1 },
  cod_mun: { type: Number, optional: false, index: 1 },
  name: { type: String, optional: false }
});

Municipios = new Mongo.Collection('Municipios');

municipio = function (cod_id) {
  var muns = Municipios.find({ cod_id: parseInt(cod_id)});
  return muns.count() > 0? muns.fetch()[0].name: "";
}
