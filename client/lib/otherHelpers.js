/* global Template renderDate renderAprox */
Template.registerHelper('renderDate', function (val) { return renderDate(val); });
Template.registerHelper('renderAprox', function (val) { return renderAprox(val); });
