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

goHome =  function(client) {
  client.url(process.env.ROOT_URL);
  client.waitForVisible('.Home');
  expect(client.isVisible('.Home')).toBe(true);
  // Close alert
  if (client.isVisible('span.close')) {
    client.click('span.close');
  }
  if (client.isVisible('#acceptCookies')) {
    client.click('#acceptCookies');
  };
};
