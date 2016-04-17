/* global Template */
Template.difuTabular.helpers({
  photo: function () { return this.item.photo; },
  text: function () { return this.item.text; },
  link: function () { return '/'; /* FIXME */ }
});
