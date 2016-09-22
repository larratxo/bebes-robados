
/*global undef:true,noUndef:true,defaultCreatedAt:true,
 defaultUpdateAt:true,isValidLatLng:true, lastWeek:true, calcShowAll:true,
 lastDays: true, lastDay:true, initYear:true, thisYear:true, lastYear:true, isNew:true
 currentAdCampaign:true nifValido:true */

undef = function (obj) {
  return typeof obj === 'undefined' || obj === null;
};

noUndef = function (obj) {
  return !undef(obj);
};

defaultCreatedAt = {
  type: Date,
  autoform: { type: 'hidden' },
  autoValue: function () {
    if (this.isInsert) {
      return new Date();
    } else {
      this.unset();  // Prevent user from supplying their own value
    }
  }
};

defaultUpdateAt = {
  type: Date,
  autoform: { type: 'hidden' },
  autoValue: function () {
    if (this.isUpdate || this.isInsert) {
      return new Date();
    }
  },
  // Commented because we want to have updateAt = createAt initialy
  // denyInsert: true,
  optional: true
};

isValidLatLng = function (l) {
  return (typeof l === 'number' && !isNaN(l)) ||
         (typeof l === 'string' && l.length > 0 && !isNaN(l));
};

lastWeek = function () {
  return lastDays(7);
};

lastDay = function () {
  return lastDays(1);
};

var today = new Date();

lastDays = function (days) {
  var lastWeek = new Date(today.getFullYear(),
                          today.getMonth(), today.getDate() - days);
  return lastWeek;
};

initYear = 1936;
lastYear = 1990;

thisYear = new Date().getFullYear();
calcShowAll = null;

isNew = function (updatedAt) {
  return updatedAt > lastDays(7);
};

currentAdCampaign = 1;

// From: https://donnierock.com/2011/11/05/validar-un-dni-con-javascript/
nifValido = function (dni) {
  var numero;
  var letr;
  var letra;
  var expresion_regular_dni;

  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

  if (expresion_regular_dni.test(dni) === true) {
    numero = dni.substr(0, dni.length - 1);
    letr = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letra = letra.substring(numero, numero + 1);
    if (letra !== letr.toUpperCase()) {
      console.log('Dni erroneo, la letra del NIF no se corresponde');
      return false;
    } else {
      console.log('Dni correcto');
      return true;
    }
  } else {
    console.log('Dni erroneo, formato no válido');
    return false;
  }
}
