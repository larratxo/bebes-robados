/*global randomUsername:true,randomPassword:true,randomEmail:true */

randomUsername = function () {
  return Math.random().toString(36).substring(7);
};

randomPassword = function () {
  return randomUsername();
};

randomEmail = function () {
  return randomUsername() + "@example.com";
};
