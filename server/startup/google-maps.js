Meteor.startup(function () {
   console.log("GMaps key: " + process.env.GMAPS_KEY);
});

Meteor.methods({
  getMapKey: function () {
    // http://meteorpedia.com/read/Environment_Variables
    // https://developers.google.com/maps/documentation/javascript/get-api-key
    // export GMAPS_KEY=SomeGMapsKey
    return process.env.GMAPS_KEY;
  }
});
