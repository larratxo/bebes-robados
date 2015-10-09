Persons = new Mongo.Collection('Persons');

Schema = {};

defaultDate = function(label) {
  return  {
    type: Date,
    optional: true,
    label: label,
    autoform: {
      afFieldInput: {
        type: "date"
      }
      //type: "bootstrap-datepicker", /* i18n problems */
      //datePickerOptions: {
      //  /*format: "dd/MM/yyyy",*/
      //  language: "es"
      //}
    }
  };
}

defaultMap = function(label) {
  return {
    type: String,
    label: label,
    optional: true
  }
}

defaultAutoMap = function(label) {
  return {
    type: String,
    label: label,
    optional: true,
    autoform: {
      type: 'map',
      afFieldInput: {
        geolocation: false,
        mapType: 'roadmap',
        placeholder: "test",
        searchBox: true,
        autolocate: false,
        defaultLat: 40.4167754,
        defaultLng: -3.7037902,
        zoom: 5,
        googleMap: { language: "es" }
      }}};
};

Schema.Persons =  new SimpleSchema({
  buscasBebe: { type: Boolean, optional: false, label: "¿Qué buscas?",
                autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "a un bebe", falseLabel: "a mi familia"}}},
  nombreCompleto: { type: String, label: "Nombre completo del niño/a:" },
  fechaNacimiento: defaultDate("Fecha de nacimiento:"),
  fechaNacimientoEsAprox: { type: Boolean, optional: true, label: "¿es esta fecha aproximada?",
                            autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  sexo: { type: String, label: "Sexo:", allowedValues: ["Desconocido", "Hombre", "Mujer", "Otro" ] },
  // geocomplete!!! https://atmospherejs.com/jeremy/geocomplete
  lugarNacimiento: defaultMap("Lugar de nacimiento:"),
  lugarNacimientoDireccion: {type: String, optional: true, label: "Dirección:"},
  lugarNacimientoProvincia: {type: String, optional: true, label: "Provincia:"},
  lugarNacimientoProvinciaNombre: {type: String, optional: true, label: "Provincia:"},
  lugarNacimientoMunicipio: {type: String, optional: true, label: "Municipio:"},
  lugarNacimientoMunicipioNombre: {type: String, optional: true, label: "Municipio:"},
  lugarNacimientoPais: {type: String, optional: true, label: "País:", allowedValues: ["España", "Otro" ]},
  lugarNacimientoLatitud: {type: String, optional: true, label: "Latitud:"},
  lugarNacimientoLongitud: {type: String, optional: true, label: "Longitud:"},
  fechaFallecimiento: defaultDate("Fecha del fallecimiento:"),
  fechaFallecimientoEsAprox: { type: Boolean, optional:true, label: "¿La fecha del fallecimiento es aproximada?",
                               autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  nombreCompletoMadre: { type: String, optional: true, label: "Nombre completo de la madre:" },
  nombreCompletoPadreOConyuge: { type: String, optional: true, label: "Nombre completo del padre o cónyuge:" },
  motivoMuerte: { type: String, optional: true, label: "Motivo de la muerte:" },
  vistoCadaver: {type: Boolean, optional: true, label: "¿Vio algún miembro de la familia el cadaver?",
                 autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  noVistoCadaverRazon: {
    type: String, optional: true, label: "¿Por qué no lo vio?",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "No tuvimos fuerzas para ver el cadáver.", value: "sinfuerzas"},
          {label: "No nos dejaron. El niño estaba muy desfigurado.", value: "desfigurado"},
          {label: "No nos dejaron. Lo habían enterrado sin decir nada a la familia.", value: "enterrado"},
          {label: "No nos dejaron. Otras razones.", value: "otras"}
        ];
      }
    }
  },
  noVistoCadaverOtrasRazones: {type: String, optional: true, label: "¿Qué otras razones?" },
  entierroPorHospital: {type: Boolean, optional: true, label: "¿Se hizo cargo del entierro el hospital?",
                        autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  entierroPorHospitalMotivos: {
    type: String, optional: true, label: "¿Por qué se hizo cargo del entierro el hospital?",
    autoform: {
      type: "select-radio",
      options: function () {
        return [
          {label: "La familia no disponía de seguro de entierro y el hospital se ofreció a pagar y gestionar el entierro.", value: "sinseguro"},
          {label: "La familia disponía de seguro de entierro pero el hospital ni siquiera preguntó.", value: "conseguro"},
          {label: "Otras razones.", value: "otras"}
        ];
      }
    }
  },
  entierroPorHospitalOtrasRazones: {type: String, optional: true, label: "¿Qué otras razones?" },
  cementerioEnterrado: defaultMap("¿En qué cementerio fue enterrado?"),
  posibilidadPruebasADN: {type: Boolean, label: "¿Esta en una sepultura perpetua con posibilidades de exhumación para realizar pruebas de ADN?", optional: true,
                          autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  sepulturaTemporalPruebasADN: {type: Boolean, label: "¿Está en una sepultura temporal colectiva (5 o más cuerpos) con posibilidades de exhumación para realizar pruebas de ADN?", optional: true,
                                autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  enOsarioComun: {type: Boolean, label: "¿Está en un osario común?", optional: true,
                  autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  enOsarioComunDesdeFecha: defaultDate("¿Desde que fecha en osario común?"),
  motivosSospecha: {type: String, optional: true, label: "Motivos por el que sospecha de que el niño/a no falleció realmente y pudo ser robado:" },
  nombreCompletoMedico: { type: String, optional: true, label: "Nombre completo del médico:" },
  nombreCompletoMatrona: { type: String, optional: true, label: "Nombre completo de la matrona:" },
  nombreCompletoEnfermera: { type: String, optional: true, label: "Nombre completo de la enfermera:" },
  nombreOtroPersonalMedico: { type: String, label: "Nombre de algún otro miembro del personal médico, de enfermería, de dirección o administración del centro médico:", optional: true },

  nombreFuncionariosRegCivil: { type: String, optional: true, label: "Nombres de funcionarios del Registro Civil:" },
  nombreFuncionariosCementario: { type: String, optional: true, label: "Nombres de funcionarios del cementerio:" },
  nombreTrabajadoresFuneraria: { type: String, optional: true, label: "Nombres de trabajadores de funerarias:" },
  nombreOtrosFuncionariosOTrabajadores: { type: String, optional: true, label: "Nombres de otros funcionarios o trabajadores:" },

  gestionesRealizadasYDocumentos: {type: String, optional: true, label: "Gestiones realizadas y documentos conseguidos:" },
  denunciaEnComisaria: {type: Boolean, optional: true, label: "¿Ha puesto denuncia en la Comisaría?",
                        autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  denunciaEnComisariaEstadoTramitacion: {type: String, optional: true },
  denunciaEnFiscalia: {type: Boolean, optional: true, label: "¿Ha puesto denuncia en la Fiscalía?",
                       autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  denunciaEnFiscaliaEstadoTramitacion: {type: String, optional: true },
  denunciaEnJuzgado: {type: Boolean, optional: true, label: "¿Ha puesto denuncia en el Juzgado?",
                      autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  denunciaEnJuzgadoEstadoTramitacion: {type: String, optional: true },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate || this.isInsert) {
        return new Date();
      }
    },
    // denyInsert: true,
    optional: true
  }
});

Persons.attachSchema(Schema.Persons);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Persons.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}

if (Meteor.isServer) {
  Persons.before.insert(function (userId, doc) {
    console.log(doc.lugarNacimientoProvincia);
    console.log(doc.lugarNacimientoMunicipio);
    var prov = parseInt(doc.lugarNacimientoProvincia);
    var muni = parseInt(doc.lugarNacimientoMunicipio);
    if (!isNaN(prov) && prov >= 0) {
      doc.lugarNacimientoProvinciaNombre = provincia(prov);
    }
    if (!isNaN(muni) && muni >= 0) {
      doc.lugarNacimientoMunicipioNombre = municipio(prov, muni);

    }
    console.log(doc.lugarNacimientoProvinciaNombre);
    console.log(doc.lugarNacimientoMunicipioNombre);
  });
}
