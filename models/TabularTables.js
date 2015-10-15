/* global TabularTables:true,moment,tabLanguageEs:true,renderDate:true,
   isValidLatLng,renderSexo:true,renderSexoAlt:true,renderGeo:true,renderAprox:true,
   decorateNacAprox:true,setEmptyTable:true*/
// https://github.com/aldeed/meteor-tabular
// Comparison: http://reactive-table.meteor.com/

TabularTables = {};

// https://datatables.net/reference/option/
var tabLanguageEs = {
  "sProcessing":     "Procesando...",
  "sLengthMenu":     "Mostrar _MENU_ resultados",
  "sZeroRecords":    "No se encontraron resultados",
  "sEmptyTable":     "Ningún dato disponible",
  "sInfo":           "Mostrando del _START_ al _END_ de un total de _TOTAL_",
  "sInfoEmpty":      "Mostrando del 0 al 0 de un total de 0",
  "sInfoFiltered":   "(filtrado de un total de _MAX_)",
  "sInfoPostFix":    "",
  "sSearch":         "Buscar:",
  "sUrl":            "",
  "sInfoThousands":  ",",
  "sLoadingRecords": "Cargando...",
  "oPaginate": {
    "sFirst":    "Primero",
    "sLast":     "Último",
    "sNext":     "Siguiente",
    "sPrevious": "Anterior"
  },
  "oAria": {
    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
  }
};

setEmptyTable = function(text) {
  tabLanguageEs.sEmptyTable=text;
  TabularTables.Persons.options.language=tabLanguageEs;
};

renderDate = function (val) {
  // http://momentjs.com/docs/#/displaying/
  if (val instanceof Date) {
    return moment(val).format('DD-MMM-YYYY');
  } else {
    return "";
  }
};

var sexosAbrev    = {"Hombre" : "♂",
                     "Mujer" : "♀", "Desconocido": "?", "Otro": "Otro" };
var sexosAbrevAlt = {"Hombre" : "♂",
                     "Mujer" : "♀", "Desconocido": "", "Otro": "" };

renderSexo = function (val) {
  return sexosAbrev[val];
};

renderSexoAlt = function (val) {
  return sexosAbrevAlt[val];
};

var abrev = { true: "≈", false: "", undefined: "" };

renderAprox = function (val) {
  return abrev[val];
};

decorateNacAprox = function (val, type, doc) {
  var date = renderDate(val, type, doc);
  return abrev[doc.fechaNacimientoEsAprox] + date;
};

var abrevBebeOFamilia = { true: "B", false: "F"};

var renderBuscasBebe = function (val) {
  return abrevBebeOFamilia[val];
};

var renderGeo = function (val) {
  return isValidLatLng(val)?
         "<i title='Geolocalizado' class='fa fa-map-marker'></i>": "";
};

TabularTables.Persons = new Tabular.Table({
  name: "Persons",
  collection: Persons,
  language: tabLanguageEs,
  fnPreDrawCallback: function() {
    // console.log("Searching");
  },
  fnDrawCallback: function() {
    // console.log("Not searching");
  },
  // displayLength: 20,
  // https://datatables.net/examples/basic_init/table_sorting.htmlv
  order: [[1, "desc"], [ 0, "desc" ]],
  // https://datatables.net/examples/basic_init/scroll_x.html
  scrollX: true,
  columns: [
    {data: "createdAt", title: "Creado", render: renderDate, visible: false},
    {data: "updatedAt", title: "Actualizado", render:
     renderDate, visible: false},
    {data: "nombreCompleto", title: "Nombre del niño/a"},
    {data: "sexo", title: "Sexo", render: renderSexo,
     className: "column-center"},
    {data: "buscasBebe", title: "Busca Bebe o Familia",
     render: renderBuscasBebe, className: "column-center"},
    {data: "fechaNacimientoEsAprox", title: "",
     render: renderAprox, visible: false },
    {data: "fechaNacimiento", title: "Fecha nacimiento",
     render: decorateNacAprox },
    {data: "nombreCompletoMadre", title: "Nombre de la madre"},
    {data: "nombreCompletoPadreOConyuge", title: "Nombre del cónyuge"},
    {data: "lugarNacimiento", title: "Lugar de nacimiento"},
    {data: "lugarNacimientoProvinciaNombre", title: "Provincia" },
    {data: "lugarNacimientoMunicipioNombre", title: "Municipio" },
    // {data: "lugarNacimientoLongitud", title: "Geo1"},
    {data: "lugarNacimientoLongitud", title: "Geo", render: renderGeo,
     className: "column-center" }
    // {data: "lugarNacimientoPais", title: "País"}
    // {data: "cementerioEnterrado", title: "Cementerio"}
  ]
});
