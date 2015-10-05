$('a[href="#fallecimiento"]').on('shown.bs.tab', function(e)
  {
    google.maps.event.trigger(map, 'resize');
  });
