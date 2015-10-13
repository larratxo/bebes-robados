/*global client, Meteor, module */

module.exports = function () {
  this.Before(function () {
    this.BebesHelper = {
      sessionSet: function (name, val) {
        client.executeAsync(function (name, val, done) {
          Session.set(name, val);
          done();
        }, name, val);
      }
    };
  });
};
