sitemaps.add('/sitemap.xml', function() {
  var out = [];
  out.push({ page: '/quienesSomos', lastmod: new Date() });
  out.push({ page: '/donaciones', lastmod: new Date() });
  out.push({ page: '/legal', lastmod: new Date() });
  out.push({ page: '/bebes', lastmod: new Date() });

  var pages = Persons.find().fetch();
  _.each(pages, function(page) {
    out.push({
      page: '/bebe/' + page._id,
      lastmod: page.updatedAt
    });
  });
  return out;
});
