// https://github.com/aldeed/meteor-tabular
// Comparison: http://reactive-table.meteor.com/

TabularTables = {};

// https://datatables.net/reference/option/
tabLanguageEs = {
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

// Move this to other place
moment.locale("es");

renderDate = function (val, type, doc) {
  // http://momentjs.com/docs/#/displaying/
  if (val instanceof Date) {
    return moment(val).format('DD-MMM-YYYY');
  } else {
    return "";
  }
};

function indent(val) {
  return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + val;
}

renderSexo = function (val, type, doc) {
  return val === "Hombre"? indent("♂"): val === "Mujer"? indent("♀") : val === "Desconocido"? indent("?"): "Otro";
};

renderAprox = function (val, type, doc) {
  return val === true? "≈": "";
};

renderBuscasBebe = function (val, type, doc) {
  return val === true? indent("B"): indent("F");
};

renderProvincia = function (val, type, doc) {
  return provincia(val);
}

renderMunicipio = function (val, type, doc) {
  return municipio(doc.lugarNacimientoProvincia, doc.lugarNacimientoMunicipio);
}

TabularTables.Persons = new Tabular.Table({
  name: "Persons",
  collection: Persons,
  language: tabLanguageEs,
  // displayLength: 20,
  // https://datatables.net/examples/basic_init/table_sorting.htmlv
  order: [[1, "desc"], [ 0, "desc" ]],
  // https://datatables.net/examples/basic_init/scroll_x.html
  scrollX: true,
  columns: [
    {data: "createdAt", title: "Creado", render: renderDate, visible: false},
    {data: "updatedAt", title: "Actualizado", render: renderDate, visible: false},
    {data: "buscasBebe", title: "Busca Bebe o Familia", render: renderBuscasBebe},
    {data: "nombreCompleto", title: "Nombre del niño/a"},
    {data: "sexo", title: "Sexo", render: renderSexo},
    {data: "fechaNacimientoEsAprox", title: "", render: renderAprox },
    {data: "fechaNacimiento", title: "Fecha nacimiento", render: renderDate },
    {data: "fechaFallecimientoEsAprox", title: "", render: renderAprox },
    {data: "fechaFallecimiento", title: "Fecha fallecimiento", render: renderDate },
    {data: "nombreCompletoMadre", title: "Nombre de la madre"},
    {data: "nombreCompletoPadreOConyuge", title: "Nombre del cónyuge"},
    {data: "lugarNacimiento", title: "Lugar de nacimiento"},
    {data: "lugarNacimientoProvincia", title: "Provincia", render: renderProvincia},
    {data: "lugarNacimientoProvinciaNombre", title: "Provincia" },
    {data: "lugarNacimientoMunicipioNombre", title: "Municipio" },
    {data: "lugarNacimientoMunicipio", title: "Municipio", render: renderMunicipio}
    // {data: "lugarNacimientoPais", title: "País"}
    // {data: "cementerioEnterrado", title: "Cementerio"}
  ]
});
