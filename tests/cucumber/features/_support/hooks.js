/*global module, require */
(function () {

  'use strict';

  module.exports = function () {

    this.Before(function () {
      global.expect = require('xolvio-jasmine-expect').expect;
    });
  };
})();
