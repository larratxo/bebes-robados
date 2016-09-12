/* global success:true alertMessage:true Bert successWithTitle:true, RavenLogger */

// https://github.com/themeteorchef/bert

success = function (message) {
  Bert.alert(message, 'success', 'growl-top-right');
};

successWithTitle = function (title, message) {
  Bert.alert({
    type: 'success',
    style: 'growl-top-right',
    title: title,
    message: message
  });
};

alertMessage = function (message) {
  // error can be an object...
  RavenLogger.log(message);
  Bert.alert('' + message, 'danger', 'growl-top-right');
};
