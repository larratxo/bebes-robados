Schema.Municipios = new SimpleSchema({
  cod_prov: { type: Number, optional: false, index: 1 },
  cod_mun: { type: Number, optional: false, index: 1 },
  name: { type: String, optional: false }
});

Municipios = new Mongo.Collection('Municipios');

municipio = function (prov, mun) {
  var muns = Municipios.find({ cod_prov: parseInt(prov), cod_mun: parseInt(mun) });
  return muns.count() > 0? muns.fetch()[0].name: "";
}
