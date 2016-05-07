/* global success:true alert:true Bert */

success = function (message) {
  Bert.alert(message, 'success', 'growl-top-right');
};

alert = function (message) {
  Bert.alert(message, 'danger', 'growl-top-right');
};
