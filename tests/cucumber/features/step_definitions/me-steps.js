/* globals module */
module.exports = function () {
  var table;

  this.Given(/^que tengo una cuenta y estoy logeado$/, function (callback) {
    this.AuthenticationHelper.createSomeAccount(callback);
  });

  this.Given(/^una lista de datos personales$/, function (table, callback) {
    table = table.raw();
    callback();
  });

  this.Given(/^actualizo mi perfil correctamente$/, function () {
    pending();
  });
};
