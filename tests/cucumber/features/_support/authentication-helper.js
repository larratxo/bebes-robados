/*global client, Meteor, module */

module.exports = function () {
  this.Before(function () {

    var loginBegin = function (client) {
        // http://webdriver.io/api/utility/waitForVisible.html
        client.waitForVisible('#login-username-or-email');
    };

    var loginEnd = function (client, passwd) {
      client.setValue('#login-password', passwd);
      client.click('#login-buttons-password');
      client.waitForVisible(
        'li#login-dropdown-list.dropdown a.dropdown-toggle');
      // No error
      client.waitForVisible( // true means the opposite
                             '#login-dropdown-list > div > div.alert.alert-danger', 500, true);
    };

    this.AuthenticationHelper = {
      loginEmail: function (username, email, passwd) {
        loginBegin(client);
        client.setValue('#login-username-or-email', email);
        loginEnd(client, passwd);
      },

      loginUsername: function (username, email, passwd) {
        loginBegin(client);
        client.setValue('#login-username-or-email', username);
        loginEnd(client, passwd);
      },

      checkCurrentUser: function (name) {
        client.waitForText('li#login-dropdown-list.dropdown a.dropdown-toggle',
                           name.toUpperCase());
      },

      logout: function () {
        client.executeAsync(function (done) {
          Meteor.logout(done);
        });
      },

      createAccount: function (username, email, passwd) {
        // http://webdriver.io/api/protocol/executeAsync.html
        client.executeAsync(function (username, email, passwd, done) {
          Accounts.createUser({
            username: username,
            email: email,
            password: passwd
          }, done);
        }, username, email, passwd);
      }
    };
  });
};
