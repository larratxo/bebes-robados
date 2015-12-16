/*global client, Meteor, module */

module.exports = function () {
  require("../_support/test-helper.js");

  this.Before(function () {

    var isLogged = function(client) {
      return client.execute(function () {
        return typeof Meteor.userId() === "string";
      }).value;
    };

    var isNotLogged = function(client) {
      return !isLogged(client);
    }

    var openLoginDialog = function (client) {
      var doesExist = client.waitForVisible("li#login-dropdown-list a");
      expect(doesExist).toBe(true);
      client.click("li#login-dropdown-list a");
      client.waitForVisible('#login-username-or-email');
    }

    var loginBegin = function (client) {
      // http://webdriver.io/api/utility/waitForVisible.html
      if (isNotLogged(client)) {
        // client.click("li#login-dropdown-list.dropdown a.dropdown-toggle");
        openLoginDialog(client);
      } else {
        client.execute(function () {
          Meteor.logout();
        });
        openLoginDialog(client);
      }
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
        client.waitForText('#login-dropdown-list', name.toUpperCase());
        var currentuser = null;
        while (currentuser === null) {
          currentuser = client.execute(function () {
            return Meteor.user();
          }).value;
        }
        var currentname = client.execute(function () {
          return Meteor.user().username;
        }).value;
        // console.log(currentname);
        expect(currentname).toBe(name);
      },

      logout: function (done) {
        client.executeAsync(function (done) {
          Meteor.logout(done);
        });
      },

      createAccount: function (username, email, passwd) {
        client.executeAsync(function (username, email, passwd, done) {
          Meteor.logout();
          Accounts.createUser({
              username: username,
              email: email,
              password: passwd
          }, done);
        }, username, email, passwd);
      },
    };
  });
};
