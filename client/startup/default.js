/* global Meteor Bert GoogleMaps $ moment */

Meteor.startup(function () {
  // https://eternicode.github.io/bootstrap-datepicker/
  $.fn.datepicker.defaults.format = {
    // https://bootstrap-datepicker.readthedocs.io/en/stable/options.html#format
    toDisplay: function (date, format, language) {
      return moment(date).format('d/MM/YYYY');
    },
    toValue: function (date, format, language) {
      return moment(date, ['dd-mm-yy', 'mm-yy', 'dd-MM-yy', 'MM-yy',
                           'dd-mm-yyyy', 'mm-yyyy', 'dd-MM-yyyy', 'MM-yyyy',
                           'dd/mm/yy', 'mm/yy', 'dd/MM/yy', 'MM/yy',
                           'dd/mm/yyyy', 'mm/yyyy', 'dd/MM/yyyy', 'MM/yyyy'
                          ]).toDate();
    }
  };
  $.fn.datepicker.defaults.language = 'es';
  $.fn.datepicker.defaults.autoclose = true;
  $.fn.datepicker.defaults.clearBtn = true;
  $.fn.datepicker.defaults.orientation = 'bottom auto';
  $.fn.datepicker.dates['es'] = {
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy', clear: 'Borrar', weekStart: 1, format: 'd/MM/yyyy'};

  if (!Meteor.settings.public.isProduction) {
    Bert.defaults = {
      hideDelay: 12000
    };
    Bert.alert({
      type: 'success',
      style: 'growl-top-right',
      title: 'Estamos en pruebas',
      message: 'Puedes meter datos de bebes para testear pero ten en cuenta que durante la fase de pruebas los borraremos de tanto en tanto'});
  }
  Bert.defaults = {
    hideDelay: 5500
  };

  Meteor.call('getMapKey', function (error, result) {
    // console.log('Your application is running with google maps ' + result + ' key.');
    if (typeof result !== 'undefined') {
      GoogleMaps.load({ key: result, libraries: 'places'
        // also accepts an array if you need more than one
      });
    } else {
      console.log(error);
    }
  });

  console.log('Página cargada a las ' + moment().format('DD-MMMM-YYYY HH:mm:ss'));
});
