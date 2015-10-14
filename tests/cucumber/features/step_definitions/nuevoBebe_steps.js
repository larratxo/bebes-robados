/*global module, expect, client */
module.exports = function () {
  var bebes;

  var alta = function(callback) {
    // TODO login
    if (bebes.lenght <= 0) {
      callback(new Error('This is a data failure'));
    }
    //this.BebesHelper.sessionSet("minBornYear", 1939);
    //this.BebesHelper.sessionSet("maxBornYear", 1940);

    for (var i = 0; i < bebes.length; i++){
      client.url(process.env.ROOT_URL + 'nuevoBebe');
      client.waitForExist('#nombreCompleto', 10000);
      expect(client.getTitle()).toBe("Añade un bebe");
      client.setValue('input[name="nombreCompleto"]', bebes[i][0]);
      client.click('#sexo option[value="' + bebes[i][1] + '"]');

      client.setValue('input[name="lugarNacimiento"]', bebes[i][5]);
      client.selectByVisibleText(
        'select[name=lugarNacimientoProvincia]', bebes[i][3]);
      client.selectByVisibleText(
        'select[name=lugarNacimientoMunicipio]', bebes[i][4]);

      client.setValue('input[name="nombreCompletoMadre"]', bebes[i][6]);
      client.setValue('input[name="nombreCompletoPadreOConyuge"]', bebes[i][7]);

      client.click('input[name="fechaNacimiento"]');
      // client.keys("11");
      //client.click('input[name="fechaNacimiento"]');
      // client.keys("\uE012\uE012\uE012\uE012\uE012");
      client.keys("\uE015");
      // client.keys(['\uE012', '\uE012','\uE012', '\uE012']);
      // client.keys("\ue017\ue017\ue017\ue017\ue017\ue017\ue017\ue017");
      client.keys(bebes[i][8]);

      if (bebes[i][2] === "F") {
        client.click("input[name=buscasBebe][value=false]");
      } else {
        client.click("input[name=buscasBebe][value=true]");
      }
      client.submitForm('#nuevoBebeForm > p > button');
    }
  };

  // https://github.com/cucumber/cucumber-js/blob/b659dc887ee8e94149b2148e83857b6c653aa2fa/features/data_tables.feature
  // http://grokbase.com/t/gg/cukes/12av4y61em/cucumber-js-passing-arrays
  this.Given(/^una lista de bebes que se buscan$/, function (tabla, callback) {
    bebes = tabla.raw(); // .raw();
    callback();
  });

  this.Given(
    /^se debe de poder dar de alta correctamente$/, function (callback) {
      alta(callback);
      // Search page
      client.waitForExist('#personsTable_filter > label > input');
      expect(client.getTitle()).toBe("Busca bebe");
      callback();
    });

  this.Given(
    /^no se debe de poder dar de alta$/, function (callback) {
      alta(callback);
      client.waitForVisible(".alert-danger");
      callback();
    });
};
