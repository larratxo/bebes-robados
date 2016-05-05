/* global success:true alert:true $ */

success = function (message) {
  $.bootstrapGrowl(message, {type: 'success', align: 'center'});
};

alert = function (message) {
  $.bootstrapGrowl(message, {type: 'danger', align: 'center'});
};
