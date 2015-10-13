module.exports = function () {

  var username;
  var email;
  var passwd;

  this.Given(/^I am signed out$/, function (callback) {
    client.url(process.env.ROOT_URL);
    this.AuthenticationHelper.logout();
    callback();
  });

  this.Given(/^I have an account$/, function (callback) {
    // https://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript

    username = Math.random().toString(36).substring(7);
    email = Math.random().toString(36).substring(7) + "@example.com";
    passwd = Math.random().toString(36).substring(7);
    this.AuthenticationHelper.createAccount(username, email, passwd);
    this.AuthenticationHelper.checkCurrentUser(username);
    callback();
  });

  this.Given(/^I am on the home page$/, function (callback) {
    client.url(process.env.ROOT_URL);
    expect(client.isVisible('.Home')).toBe(true);
    callback();
  });

  this.When(/^I click on sign in link$/, function (callback) {
    client.click('span.close');
    expect(client.isVisible('.Home')).toBe(true);
    client.waitForExist('li#login-dropdown-list');
    expect(client.isVisible('li#login-dropdown-list')).toBe(true);
    client.click('li#login-dropdown-list');
    callback();
  });

  this.When(/^I enter my name and password$/, function (callback) {
    this.AuthenticationHelper.loginUsername(username, email, passwd);
    callback();
  });

    this.When(/^I enter my email and password$/, function (callback) {
    this.AuthenticationHelper.loginEmail(username, email, passwd);
    callback();
  });

  this.Then(/^I should be logged in$/, function (callback) {
    this.AuthenticationHelper.checkCurrentUser(username);
    callback();
  });

  this.When(/^I enter incorrect authentication information$/, function (callback) {
    this.AuthenticationHelper.loginUsername("foo", "foo", "foo");
     callback();
  });

  this.Then(/^I should see a user not found error$/, function (callback) {
    client.waitForVisible('#login-dropdown-list > div > div.alert.alert-danger');
    callback();
  });

};
