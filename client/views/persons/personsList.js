Template.personsList.helpers({
  selector: function () {
    var enProv = Session.get("buscaEnProvincia");
    // console.log("En prov: " + enProv);
    if (!calcShowAll()) {
      if (enProv === "-1") {
        return { "fechaNacimiento":
                 {$gte: new Date(Session.get("minBornYear"),0,1),
                  $lte: new Date(Session.get("maxBornYear"),11,31)
                 }};

      } else {
        return { "fechaNacimiento":
                 {$gte: new Date(Session.get("minBornYear"),0,1),
                  $lte: new Date(Session.get("maxBornYear"),11,31)
                 },
                 "lugarNacimientoProvincia": enProv
        };
      }
    }
    else {
      // Show all
      if (enProv === "-1") {
        return {};
      } else {
        return { "lugarNacimientoProvincia": enProv };
      }
    }
  }
});

Template.personsList.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    // console.log(rowData);
    Router.go('viewPerson', { _id: rowData._id instanceof Object ? rowData._id._str : rowData._id  });
  }
});

Template.personsList.onCreated( function() {
  setEmptyTable("");
  /* $("#personsTable_filter > label > input").removeClass("imput-sm");
  $("#personsTable_filter > label > input").addClass("input-lg"); */
});

Template.personsList.onRendered( function() {
  Session.set("DocumentTitle", "Busca bebe");

  // Select all input
  $("#personsTable_filter > label > input").focus(function() { $(this).select(); } ).mouseup(function (e) {e.preventDefault(); });

  var dataTable = $('#personsTable').closest('table').DataTable();
  onSliderRender(function() {
    dataTable.draw();
  });

  setEmptyTable("Ningún dato disponible");
  Session.setDefault("main-home-search", "");

  Deps.autorun(function () {
    var search = Session.get("main-home-search");
    $("#personsTable_filter > label > input").val(search);
    dataTable.search(search);
  });

  $("#personsTable_filter > label > input").focus();

  // Render provincias
  Session.setDefault("buscaEnProvincia", "-1");

  var onProvSelect = function(prov) {
    Session.set("buscaEnProvincia", prov);
    dataTable.draw();
  };

  var onMuniSelect = function() {
  };

  var prevProv = Session.get("buscaEnProvincia");
  var prevMuni = -1;

  renderProvincias(prevProv, prevMuni, onProvSelect, onMuniSelect, "-- todas las provincias --");
  // Fin render provincias

});
