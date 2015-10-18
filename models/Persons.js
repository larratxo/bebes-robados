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

defaultAutocomplete = function(field, textarea) {
  if (Meteor.isClient) {
    var template;
    switch (field) {
      case "nombreCompletoMedico":
        template=Template.autoMedico;
        break;
      case "nombreCompletoMatrona":
        template=Template.autoMatrona;
        break;
      case "nombreCompletoEnfermera":
        template=Template.autoEnfermera;
        break;
      case "nombreOtroPersonalMedico":
        template=Template.autoOtroMedico;
        break;
      case "nombreFuncionariosRegCivil":
        template=Template.autoFuncionariosRegCivil;
        break;
      case "nombreFuncionariosCementario":
        template=Template.autoFuncionariosCementario;
        break;
      case "nombreTrabajadoresFuneraria":
        template=Template.nombreTrabajadoresFuneraria;
        break;
      case "nombreOtrosFuncionariosOTrabajadores":
        template=Template.autoOtrosFuncionariosOTrabajadores;
        break;
    }
    return {
      afFieldInput: {
        type: textarea? 'autocomplete-textarea' : 'autocomplete-input',
        placeholder: textarea? "Lista de nombres y apellidos, sobrenombres o apodos" : "Nombre y apellidos, sobrenombre o apodo",
        settings: function() {
          return {
            position: "bottom",
            limit: 5,
            rules: [ {
              // token: '@',
              collection: Persons,
              field: field,
              template: template,
              noMatchTemplate: Template.noautocomplete
            }]
          };
        }
      }
    }
  }
  return {}
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
  parentesco: { type: String, label: "Parentesco con el presunto niño/a robado:", optional: true, allowedValues: [
    "Madre", "Padre", "Cónyuge", "Abuela", "Abuelo", "Hermana", "Hermano", "Otro"
  ] },
  familiar: { type: String, optional: true, autoValue: function(){ return this.userId; } },
  nombreCompleto: { type: String, label: "Nombre completo del niño/a:" },
  fechaNacimiento: defaultDate("Fecha de nacimiento:"),
  fechaNacimientoEsAprox: { type: Boolean, optional: true, label: "¿es esta fecha aproximada?",
                            autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  sexo: { type: String, label: "Sexo:", allowedValues: ["Desconocido", "Hombre", "Mujer", "Otro" ] },
  // geocomplete!!! https://atmospherejs.com/jeremy/geocomplete
  lugarNacimiento: defaultMap("Lugar de nacimiento:"),
  lugarNacimientoDireccion: {type: String, optional: true, label: "Dirección:"},
  lugarNacimientoProvincia: {type: String, optional: true, label: "Provincia:"},
  lugarNacimientoProvinciaNombre: {type: String, optional: true, label: "Provincia:", autoform: { type: 'hidden' } },
  lugarNacimientoMunicipio: {type: String, optional: true, label: "Municipio:"},
  lugarNacimientoMunicipioNombre: {type: String, optional: true, label: "Municipio:", autoform: { type: 'hidden'} },
  lugarNacimientoPais: {type: String, optional: true, label: "País:", allowedValues: ["España", "Otro" ] },
  lugarNacimientoLatitud: {type: String, optional: true, label: "Latitud:", autoform: { type: 'hidden'} },
  lugarNacimientoLongitud: {type: String, optional: true, label: "Longitud:", autoform: { type: 'hidden'} },
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
  cementerioEnterradoLatitud: {type: String, optional: true, label: "Latitud:"},
  cementerioEnterradoLongitud: {type: String, optional: true, label: "Longitud:"},
  posibilidadPruebasADN: {type: Boolean, label: "¿Esta en una sepultura perpetua con posibilidades de exhumación para realizar pruebas de ADN?", optional: true,
                          autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  sepulturaTemporalPruebasADN: {type: Boolean, label: "¿Está en una sepultura temporal colectiva (5 o más cuerpos) con posibilidades de exhumación para realizar pruebas de ADN?", optional: true,
                                autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  enOsarioComun: {type: Boolean, label: "¿Está en un osario común?", optional: true,
                  autoform: { afFieldInput: { type: "boolean-radios", trueLabel: "Sí", falseLabel: "No"}}},
  enOsarioComunDesdeFecha: defaultDate("¿Desde que fecha en osario común?"),
  motivosSospecha: {type: String, optional: true, label: "Motivos por el que sospecha de que el niño/a no falleció realmente y pudo ser robado:" },
  nombreCompletoMedico: { type: String, optional: true, label: "Nombre completo del médico:", index: 1,
                          autoform: defaultAutocomplete("nombreCompletoMedico", false) },
  nombreCompletoMatrona: { type: String, optional: true, label: "Nombre completo de la matrona:", index: 1,
                           autoform: defaultAutocomplete("nombreCompletoMatrona", false) },
  nombreCompletoEnfermera: { type: String, optional: true, label: "Nombre completo de la enfermera:", index: 1,
                             autoform: defaultAutocomplete("nombreCompletoEnfermera", false) },
  nombreOtroPersonalMedico: { type: String, label: "Nombre de algún otro miembro del personal médico, de enfermería, de dirección o administración del centro médico:", optional: true, index: 1,
                              autoform: defaultAutocomplete("nombreOtroPersonalMedico", true) },
  nombreFuncionariosRegCivil: { type: String, optional: true, label: "Nombres de funcionarios del Registro Civil:", index: 1,
                                autoform: defaultAutocomplete("nombreFuncionariosRegCivil", false) },
  nombreFuncionariosCementario: { type: String, optional: true, label: "Nombres de funcionarios del cementerio:", index: 1,
                                  autoform: defaultAutocomplete("nombreFuncionariosCementario", false) },
  nombreTrabajadoresFuneraria: { type: String, optional: true, label: "Nombres de trabajadores de funerarias:", index:1,
                                 autoform: defaultAutocomplete("nombreTrabajadoresFuneraria", false) },
  nombreOtrosFuncionariosOTrabajadores: { type: String, optional: true, label: "Nombres de otros funcionarios o trabajadores:", index: 1,
                                          autoform: defaultAutocomplete("nombreOtrosFuncionariosOTrabajadores", true) },
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
  createdAt: defaultCreatedAt,
  updatedAt: defaultUpdateAt
});

Persons.attachSchema(Schema.Persons);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  // Mejorar con: http://docs.meteor.com/#/full/allow

  Persons.allow({
    insert : function () {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
  //    return doc.familiar === userId);
    },
    remove : function () {
      return false;
    }
  });
}

if (Meteor.isClient) {
  // https://github.com/aldeed/meteor-autoform#should-the-value-of-schema-and-collection-have-quotation-marks-around-it
  Template.registerHelper("Schema", Schema);
}
