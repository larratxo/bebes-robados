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
      client.deleteCookie("meteor_login_token");
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

    var loginEnd = function (client, passwd, shouldFail) {
      client.setValue('#login-password', passwd);
      client.click('#login-buttons-password');
      client.waitForVisible(
        'li#login-dropdown-list.dropdown a.dropdown-toggle');
      // No error
      if (shouldFail === undefined) {
        shouldFail = false;
      }
      client.waitForVisible( // true means the opposite
                             '.danger', undefined, !shouldFail);
    };

    this.AuthenticationHelper = {
      loginEmail: function (username, email, passwd) {
        loginBegin(client);
        client.setValue('#login-username-or-email', email);
        loginEnd(client, passwd);
      },

      loginUsername: function (username, email, passwd, shouldFail) {
        loginBegin(client);
        client.setValue('#login-username-or-email', username);
        loginEnd(client, passwd, shouldFail);
      },

      registerUsername: function (username, email, passwd, conditions) {
        loginBegin(client);
        client.waitForVisible('#signup-link');
        client.click('#signup-link');
        client.waitForVisible('#login-conServicioAceptadas');
        client.setValue('input[id="login-username"]', username);
        client.setValue('input[id="login-email"]', email);
        client.setValue('input[id="login-password"]', passwd);
        if (conditions) {
          client.click('input[id="login-conServicioAceptadas"]');
        }
        client.click("#login-buttons-password");
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

      isLogged: function (client) {
        return isLogged(client);
      },

      isNotLogged: function (client) {
        return isNotLogged(client);
      },

      logout: function (done) {
        client.executeAsync(function (done) {
          Meteor.logout(done);
        });
      },

      createAccount: function (username, email, passwd) {
        client.execute(function (username, email, passwd, done) {
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
