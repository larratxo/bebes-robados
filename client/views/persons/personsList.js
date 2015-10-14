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
    Router.go('bebePage', { _id: rowData._id instanceof Object ? rowData._id._str : rowData._id  });
  }
});

Template.personsList.onRendered( function() {
  Session.set("DocumentTitle", "Busca bebe");

  var dataTable = $('#personsTable').closest('table').DataTable();
  onSliderRender(function() {
    dataTable.draw();
  });

});
