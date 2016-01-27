Meteor.startup(function () {
   // console.log("GMaps key: " + process.env.GMAPS_KEY);
});

Meteor.methods({
  getMapKey: function () {
    // http://meteorpedia.com/read/Environment_Variables
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    // https://console.developers.google.com/
    // export GMAPS_KEY=SomeGMapsKey
    return process.env.GMAPS_KEY;
  },
  getOwaUrl: function() {
    return process.env.BEBES_OWA_URL;
  },
  getOwaSiteId: function() {
    return process.env.BEBES_OWA_SITE_ID;
  }
});
