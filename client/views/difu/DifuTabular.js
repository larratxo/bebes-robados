/* global Template UI */
Template.difuTabular.helpers({
  photo: function () { return this.item.photo; },
  text: function () { return this.item.text; },
  link: function () { return '/bebe/' + this.item.bebe; },
  linkroot: function () { return '/'; /* FIXME */ }
});
