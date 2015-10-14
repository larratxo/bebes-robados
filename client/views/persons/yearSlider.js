/*global initYear, thisYear, onSliderRender:true */
Deps.autorun(function () {
  // console.log("min: " + Session.get("minBornYear") +
  // ", max: " + Session.get("maxBornYear"));
});

onSliderRender = function (changeCallback) {
  var initSpan = this.$("#initSliderYear");
  var endSpan = this.$("#endSliderYear");

  initSpan.text(Session.get("minBornYear"));
  endSpan.text(Session.get("maxBornYear"));

  // http://refreshless.com/nouislider/examples/
  this.$("#yearSlider").noUiSlider({
    start: [Session.get("minBornYear"), Session.get("maxBornYear")],
    connect: false,
    range: {
      min: initYear,
      max: thisYear
    }
  // }).on('slide', function (ev, val) {
  }).on('change', function (ev, val) {
    var min = Math.round(val[0]);
    var max = Math.round(val[1]);
    Session.set('minBornYear', min);
    Session.set('maxBornYear', max);
    $("#initSliderYear").text(min);
    $("#endSliderYear").text(max);
    changeCallback();
  });
};

Template.yearSlider.onRendered( function() {
});
