Meteor.startup(function () {

  $.fn.datepicker.dates.es = {
    days:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
    daysShort:["Dom","Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],
    daysMin:["Do","Lu","Ma","Mi","Ju","Vi","Sa","Do"],
    months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    today:"Hoy",
    clear:"Borrar",
    weekStart:1,
    format:"dd/MM/yyyy"};


  Meteor.call("getMapKey", function (error, result) {
    console.log("Your application is running with google maps " + result + " key.");
    if (typeof(result) !== 'undefined') {
      GoogleMaps.load({
        key: result,
        libraries: 'places'  // also accepts an array if you need more than one
      });
    }
  });
});
