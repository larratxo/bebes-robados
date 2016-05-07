$('a[href="#fallecimiento"]').on('show.bs.tab', function () {
  var map = $("#cementerioEnterrado").geocomplete("map");
  google.maps.event.trigger(map, "resize");
});
