Template.personsList.helpers({
  selector: function () {
    if (!calcShowAll()) {
      return { "fechaNacimiento":
               {$gte: new Date(Session.get("minBornYear"),0,1),
                $lte: new Date(Session.get("maxBornYear"),11,31)
               }};
    }
    else {
      // Also show null
      return {};
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

  Deps.autorun(function () {
    var search = Session.get("main-home-search");
    $("#personsTable_filter > label > input").val(search);
    dataTable.search(search);
  });

  $("#personsTable_filter > label > input").focus();

});
