/* globals module */
module.exports = function () {
  var datos;

  this.Given(/^unos datos personales$/, function (table, callback) {
    datos = table.raw();
    callback();
  });

  var clickInSettingsMenuItem = function (client) {
    client.click("li#login-dropdown-list a");
    client.waitForVisible('#login-buttons-open-change-settings');
    client.click('#login-buttons-open-change-settings');
    client.waitForVisible(".btn-form-submit");
  };

  this.Given(/^actualizo mi perfil correctamente$/, function (callback) {
    clickInSettingsMenuItem(client);
    client.setValue('input[name="profile.name"]', datos[0][0]);
    client.setValue('input[name="profile.dni"]', datos[0][1]);
    client.setValue('input[name="profile.telefono"]', datos[0][2]);

    // Subo imagen

    if (!phantomJs) {
      client.chooseFile("div.autoform-array-item-body > div > div > div > button > input", datos[0][3]);
      client.waitForVisible("div.autoform-array-item-body > div > div > div > a > img");
    }

    client.setValue('input[name="profile.redesSociales.0.url"]', datos[0][4]);

    client.click('.btn-form-submit');

    // Home
    client.click('div.navbar-header');

    // Compruebo que está todo salvado
    clickInSettingsMenuItem(client);
    // Veo que la imagen está guardada

    expect(client.getValue('input[name="profile.dni"]')).toBe(datos[0][1]);
    expect(client.getValue('input[name="profile.name"]')).toBe(datos[0][0]);
    expect(client.getValue('input[name="profile.telefono"]')).toBe(datos[0][2]);
    if (!phantomJs) {
      client.waitForVisible("div.autoform-array-item-body > div > div > div > a > img");
    }
    expect(client.getValue('input[name="profile.redesSociales.0.url"]')).toBe(datos[0][4]);

    // this.AuthenticationHelper.logout();
    callback();
  });
};
