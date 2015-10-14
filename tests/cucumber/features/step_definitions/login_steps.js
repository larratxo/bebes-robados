module.exports = function () {

  var username;
  var email;
  var passwd;
  var goHome =  function() {
    client.url(process.env.ROOT_URL);
    expect(client.isVisible('.Home')).toBe(true);
    // Close alert
    client.click('span.close');
  };

  this.Given(/^I have an account$/, function (callback) {
    // https://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    goHome();
    username = Math.random().toString(36).substring(7);
    email = Math.random().toString(36).substring(7) + "@example.com";
    passwd = Math.random().toString(36).substring(7);
    this.AuthenticationHelper.createAccount(username, email, passwd);
    this.AuthenticationHelper.checkCurrentUser(username);
    callback();
  });

  this.Given(/^I am signed out$/, function (callback) {
    goHome();
    this.AuthenticationHelper.logout();
    callback();
  });

  this.Given(/^I am on the home page$/, function (callback) {
    goHome();
    expect(client.getTitle()).toBe("Inicio");
    callback();
  });

  this.When(/^I click on sign in link$/, function (callback) {
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
    this.AuthenticationHelper.logout();
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

  this.Then(/^I can edit my profile$/, function (callback) {
    client.waitForVisible('input[name="profile.dni"]');
    client.setValue('input[name="profile.dni"]', "000000000N");
    callback();
  });
};
