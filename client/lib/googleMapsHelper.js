$('a[href="#fallecimiento"]').on('show.bs.tab', function() {
  // $.bootstrapGrowl("Funca 2");
  var map = $("#cementerioEnterrado").geocomplete("map");
  google.maps.event.trigger(map, "resize");
});
