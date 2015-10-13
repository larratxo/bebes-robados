/*global module, require, expect, isValidLatLng */
module.exports = function () {
  var bebes;

  // https://github.com/cucumber/cucumber-js/blob/b659dc887ee8e94149b2148e83857b6c653aa2fa/features/data_tables.feature
  // http://grokbase.com/t/gg/cukes/12av4y61em/cucumber-js-passing-arrays
  this.Given(/^una lista de bebes que se buscan$/, function (tabla, callback) {
    bebes = tabla.raw(); // .raw();
    callback();
  });

  this.Given(/^se debe de poder dar de alta correctamente$/, function (callback) {
    // TODO login
    if (bebes.lenght <= 0) {
      callback(new Error('This is a data failure'));
    }
    this.BebesHelper.sessionSet("minBornYear", 1939);
    this.BebesHelper.sessionSet("maxBornYear", 1940);

    for (var i = 0; i < bebes.length; i++){
      client.url(process.env.ROOT_URL + 'nuevoBebe');
      client.waitForExist('#nombreCompleto', 10000);
      client.setValue('input[name="nombreCompleto"]', bebes[i][0]);
      client.click('#sexo option[value="' + bebes[i][1] + '"]');

      client.selectByVisibleText('select[name=lugarNacimientoProvincia]', bebes[i][3]);
      client.selectByVisibleText('select[name=lugarNacimientoMunicipio]', bebes[i][4]);
      client.setValue('input[name="lugarNacimiento"]', bebes[i][5]);

      if (bebes[i][2] === "F") {
        client.click("input[name=buscasBebe][value=false]");
      } else {
        client.click("input[name=buscasBebe][value=true]");
      }
      client.submitForm('#nuevoBebeForm > p > button');
      // Search page
      client.waitForExist('#personsTable_filter > label > input');
    }
    callback();
  });
};
