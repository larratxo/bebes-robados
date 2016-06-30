/*global module, require */
(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      // This is not needed anymore
      // https://chimp.readme.io/docs/jasmine-expect
      // "We have extracted the assertion library from Jasmine and included it as the default in Chimp"
      // global.expect = require('xolvio-jasmine-expect').expect;
    });
  };
})();
