/* global success:true alert:true Bert */

success = function (message) {
  Bert.alert(message, 'success', 'growl-top-right');
};

alertMessage = function (message) {
  // error can be an object...
  Bert.alert("" + message, 'danger', 'growl-top-right');
};
