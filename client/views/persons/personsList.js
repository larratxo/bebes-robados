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
    if (typeof rowData.slug === "string") {
      Router.go('viewPersonSlug', { slug: rowData.slug });
    } else {
      Router.go('viewPerson', { _id: rowData._id instanceof Object ? rowData._id._str : rowData._id  });
    }
  }
});

Template.personsList.onCreated( function() {
  setEmptyTable("");
  /* $("#personsTable_filter > label > input").removeClass("imput-sm");
  $("#personsTable_filter > label > input").addClass("input-lg"); */
});

Template.personsList.onRendered( function() {
  Session.set("DocumentTitle", "Busca bebe");
  var searchInput = $("#personsTable_filter > label > input");

  var dataTable = $('#personsTable').closest('table').DataTable();
  onSliderRender(function() {
    dataTable.draw();
  });

  setEmptyTable("Ningún dato disponible");

  var search = Session.get("main-home-search");
  if (typeof search === "string" && searchInput.val() !== search) {
    searchInput.val(search);
    //console.log("Search: " + search);
    //console.log("Search input val: " + searchInput.val());
    dataTable.search(search);
  }

  // Select all input
  searchInput.focus(function() { $(this).select(); } ).mouseup(function (e) {e.preventDefault(); });

  // Put the cursor there
  searchInput.focus();

  searchInput.change(function() { delete Session.keys["main-home-search"]; });

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
