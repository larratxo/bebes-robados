initYear = 1939;
thisYear = new Date().getFullYear();

Session.setDefault("minBornYear", initYear);
Session.setDefault("maxBornYear", thisYear);

Deps.autorun(function () {
  console.log("min: " + Session.get("minBornYear") + ", max: " + Session.get("maxBornYear"));
});

Template.personsList.helpers({
  selector: function () {
    return { "fechaNacimiento":
                          {$gte: new Date(Session.get("minBornYear"),0,1),
                           $lte: new Date(Session.get("maxBornYear"),11,31)}};}
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
  // http://refreshless.com/nouislider/examples/

  var dataTable = $('#personsTable').closest('table').DataTable();
  var initSpan = this.$("#initSliderYear");
  var endSpan = this.$("#endSliderYear");

  initSpan.text(Session.get("minBornYear"));
  endSpan.text(Session.get("maxBornYear"));

  this.$("#yearSlider").noUiSlider({
    start: [Session.get("minBornYear"), Session.get("maxBornYear")],
    connect: false,
    range: {
      min: initYear,
      max: thisYear
    }
  }).on('slide', function (ev, val) {

  }).on('change', function (ev, val) {
    var min = Math.round(val[0]);
    var max = Math.round(val[1]);
    Session.set('minBornYear', min);
    Session.set('maxBornYear', max);
    $("#initSliderYear").text(min);
    $("#endSliderYear").text(max);
    dataTable.draw();
  });
});
