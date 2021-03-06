/* global Persons:true, Schema:true, Mongo, Meteor, Template, SimpleSchema,defaultCreatedAt,
 defaultUpdateAt,addApiRoute _ onAfterUp:true Roles CollectionRevisions alertMessage TAPi18n */

onAfterUp = function () {
  return function (err) {
    if (err) {
      if (Meteor.isClient) {
        if (err.message.indexOf('file does not pass collection filters') > -1) {
          alertMessage(TAPi18n.__('Error: El fichero es mayor del tamaño permitido'));
        } else {
          alertMessage(err.message);
        }
      }
    }
  };
};

Persons = new Mongo.Collection('Persons');

var defaultDate = function (label) {
  return {
    type: Date,
    optional: true,
    label: label,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datepicker',
        placeholder: TAPi18n.__('dia/mes/año')
      }
    }
  };
};

var defaultMap = function (label) {
  return {
    type: String,
    label: label,
    optional: true
  };
};

var defaultAutocomplete = function (field, textarea) {
  if (Meteor.isClient) {
    var template;
    switch (field) {
    case 'lugarNacimiento':
      template = Template.autoLugarNacimiento;
      break;
    case 'cementerioEnterrado':
      template = Template.autoCementerioEnterrado;
      break;
    case 'nombreCompletoMedico':
      template = Template.autoMedico;
      break;
    case 'nombreCompletoMatrona':
      template = Template.autoMatrona;
      break;
    case 'nombreCompletoEnfermera':
      template = Template.autoEnfermera;
      break;
    case 'nombreOtroPersonalMedico':
      template = Template.autoOtroMedico;
      break;
    case 'nombreFuncionariosRegCivil':
      template = Template.autoFuncionariosRegCivil;
      break;
    case 'nombreFuncionariosCementario':
      template = Template.autoFuncionariosCementario;
      break;
    case 'nombreTrabajadoresFuneraria':
      template = Template.autoTrabajadoresFuneraria;
      break;
    case 'nombreOtrosFuncionariosOTrabajadores':
      template = Template.autoOtrosFuncionariosOTrabajadores;
      break;
    }
    return {
      afFieldInput: {
        type: textarea ? 'autocomplete-textarea' : 'autocomplete-input',
        placeholder: textarea ? TAPi18n.__('Lista de nombres y apellidos, sobrenombres o apodos') : TAPi18n.__('Nombre y apellidos, sobrenombre o apodo'),
        settings: function () {
          return {
            position: 'bottom',
            limit: 5,
            rules: [ {
              // token: '@',
              collection: Persons,
              field: field,
              template: template,
              matchAll: true,
              noMatchTemplate: Template.noautocomplete
            }]
          };
        }
      }
    };
  }
  return {};
};

Schema.Persons = new SimpleSchema({
  // mismo defaultValue en Template.bebeForm.helpers buscasBebe
  buscasBebe: { type: Boolean, defaultValue: true, optional: false, label: TAPi18n.__('¿Qué buscas?'),
                autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('a un bebe robado'), falseLabel: TAPi18n.__('a mi familia biológica')}}},
  parentesco: { type: String, label: TAPi18n.__('Parentesco con el presunto niño/a robado:'), optional: true, allowedValues: [
    'Madre', 'Padre', 'Cónyuge', 'Abuela', 'Abuelo', 'Hermana', 'Hermano', 'Otro'
  ] },
  familiar: {type: String, optional: true, autoValue: function () { if (this.isInsert) { return this.userId; } }},
  nombreCompleto: { type: String, label: TAPi18n.__('Nombre completo del niño/a si llegó a registrarse:'), optional: true },
  fechaNacimiento: defaultDate(TAPi18n.__('Fecha de nacimiento:')),
  fechaNacimientoEsAprox: { type: Boolean, optional: true, label: TAPi18n.__('¿es esta fecha aproximada?'),
                            autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  sexo: { type: String, label: 'Sexo:', allowedValues: ['Desconocido', 'Hombre', 'Mujer', 'Otro'] },
  // geocomplete!!! https://atmospherejs.com/jeremy/geocomplete
  lugarNacimiento: _.extend(defaultMap(TAPi18n.__('Lugar de nacimiento:')), {autoform: defaultAutocomplete('lugarNacimiento', false)}),
  lugarNacimientoDireccion: {type: String, optional: true, label: TAPi18n.__('Dirección:')},
  lugarNacimientoProvincia: {type: String, optional: true, label: TAPi18n.__('Provincia:')},
  lugarNacimientoProvinciaNombre: {type: String, optional: true, label: TAPi18n.__('Provincia:'), autoform: {type: 'hidden'}},
  lugarNacimientoMunicipio: {type: String, optional: true, label: TAPi18n.__('Municipio:')},
  lugarNacimientoMunicipioNombre: {type: String, optional: true, label: TAPi18n.__('Municipio:'), autoform: {type: 'hidden'}},
  lugarNacimientoPais: {type: String, optional: true, label: TAPi18n.__('País:'), allowedValues: ['España', 'Otro']},
  lugarNacimientoLatitud: {type: String, optional: true, label: 'Latitud:', autoform: {type: 'hidden'}},
  lugarNacimientoLongitud: {type: String, optional: true, label: 'Longitud:', autoform: {type: 'hidden'}},
  fechaFallecimiento: defaultDate(TAPi18n.__('Fecha del fallecimiento:')),
  fechaFallecimientoEsAprox: { type: Boolean, optional: true, label: TAPi18n.__('¿La fecha del fallecimiento es aproximada?'),
                               autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  nombreCompletoMadre: { type: String, optional: true, label: TAPi18n.__('Nombre y apellidos de la madre:') },
  nombreCompletoPadreOConyuge: { type: String, optional: true, label: TAPi18n.__('Nombre y apellidos del padre:') },
  motivoMuerte: { type: String, optional: true, label: TAPi18n.__('Motivo de la muerte que figura en los documentos que obran en su poder o según la información que les facilitaron en su momento:') },
  vistoCadaver: {type: Boolean, optional: true, label: TAPi18n.__('¿Vio algún miembro de la familia el cadaver?'),
                 autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  noVistoCadaverRazon: {
    type: String, optional: true, label: TAPi18n.__('¿Por qué no lo vio?'),
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: TAPi18n.__('No tuvimos fuerzas para ver el cadáver.'), value: 'sinfuerzas'},
          {label: TAPi18n.__('No nos dejaron. El niño estaba muy desfigurado.'), value: 'desfigurado'},
          {label: TAPi18n.__('No nos dejaron. Lo habían enterrado sin decir nada a la familia.'), value: 'enterrado'},
          {label: TAPi18n.__('No nos dejaron. Otras razones.'), value: 'otras'}
        ];
      }
    }
  },
  noVistoCadaverOtrasRazones: {type: String, optional: true, label: TAPi18n.__('¿Qué otras razones?')},
  entierroPorHospital: {type: Boolean, optional: true, label: TAPi18n.__('¿Se hizo cargo del entierro el hospital?'),
                        autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  entierroPorHospitalMotivos: {
    type: String, optional: true, label: TAPi18n.__('¿Por qué se hizo cargo del entierro el hospital?'),
    autoform: {
      type: 'select-radio',
      options: function () {
        return [
          {label: TAPi18n.__('La familia no disponía de seguro de entierro y el hospital se ofreció a pagar y gestionar el entierro.'), value: 'sinseguro'},
          {label: TAPi18n.__('La familia disponía de seguro de entierro pero el hospital ni siquiera preguntó.'), value: 'conseguro'},
          {label: TAPi18n.__('Otras razones.'), value: 'otras'}
        ];
      }
    }
  },
  entierroPorHospitalOtrasRazones: {type: String, optional: true, label: TAPi18n.__('¿Qué otras razones?')},
  cementerioEnterrado: _.extend(defaultMap(TAPi18n.__('¿En qué cementerio fue enterrado?')), {autoform: defaultAutocomplete('cementerioEnterrado', false)}),
  cementerioEnterradoDireccion: {type: String, optional: true, label: TAPi18n.__('Dirección:')},
  cementerioEnterradoLatitud: {type: String, optional: true, label: 'Latitud:'},
  cementerioEnterradoLongitud: {type: String, optional: true, label: 'Longitud:'},
  posibilidadPruebasADN: {type: Boolean, label:TAPi18n.__( '¿Esta en una sepultura perpetua con posibilidades de exhumación para realizar pruebas de ADN?'), optional: true,
                          autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  sepulturaTemporalPruebasADN: {type: Boolean, label: TAPi18n.__('¿Está en una sepultura temporal colectiva (5 o más cuerpos) con posibilidades de exhumación para realizar pruebas de ADN?'), optional: true,
                                autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  enOsarioComun: {type: Boolean, label: TAPi18n.__('¿Está en un osario común?'), optional: true,
                  autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  enOsarioComunDesdeFecha: defaultDate(TAPi18n.__('¿Desde que fecha en osario común?')),
  motivosSospecha: {type: String, optional: true, label: TAPi18n.__('Motivos por el que sospecha de que el niño/a no falleció realmente y pudo ser robado:')},
  nombreCompletoMedico: { type: String, optional: true, label: TAPi18n.__('Nombre completo del médico:'), index: 1,
                          autoform: defaultAutocomplete('nombreCompletoMedico', false) },
  nombreCompletoMatrona: { type: String, optional: true, label: TAPi18n.__('Nombre completo de la matrona:'), index: 1,
                           autoform: defaultAutocomplete('nombreCompletoMatrona', false) },
  nombreCompletoEnfermera: { type: String, optional: true, label: TAPi18n.__('Nombre completo de la enfermera:'), index: 1,
                             autoform: defaultAutocomplete('nombreCompletoEnfermera', false) },
  nombreOtroPersonalMedico: { type: String, label: TAPi18n.__('Nombre de algún otro miembro del personal médico, de enfermería, de dirección o administración del centro médico:'), optional: true, index: 1,
                              autoform: defaultAutocomplete('nombreOtroPersonalMedico', true) },
  nombreFuncionariosRegCivil: { type: String, optional: true, label: TAPi18n.__('Nombres de funcionarios del Registro Civil:'), index: 1,
                                autoform: defaultAutocomplete('nombreFuncionariosRegCivil', false) },
  nombreFuncionariosCementario: { type: String, optional: true, label: TAPi18n.__('Nombres de funcionarios del cementerio:'), index: 1,
                                  autoform: defaultAutocomplete('nombreFuncionariosCementario', false)},
  nombreTrabajadoresFuneraria: { type: String, optional: true, label: TAPi18n.__('Nombres de trabajadores de funerarias:'), index: 1,
                                 autoform: defaultAutocomplete('nombreTrabajadoresFuneraria', false)},
  nombreOtrosFuncionariosOTrabajadores: { type: String, optional: true, label: TAPi18n.__('Nombres de otros funcionarios o trabajadores:'), index: 1,
                                          autoform: defaultAutocomplete('nombreOtrosFuncionariosOTrabajadores', true) },
  gestionesRealizadasYDocumentos: {type: String, optional: true, label: TAPi18n.__('Gestiones realizadas y documentos conseguidos:')},
  denunciaEnComisaria: {type: Boolean, optional: true, label: TAPi18n.__('¿Ha puesto denuncia en la Comisaría?'),
                        autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  denunciaEnComisariaEstadoTramitacion: {type: String, optional: true},
  denunciaEnGuardiaCivil: {type: Boolean, optional: true, label: TAPi18n.__('¿Ha puesto denuncia en la Guardia Civil?'),
                           autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  denunciaEnGuardiaCivilEstadoTramitacion: {type: String, optional: true},
  denunciaEnFiscalia: {type: Boolean, optional: true, label: TAPi18n.__('¿Ha puesto denuncia en la Fiscalía?'),
                       autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  denunciaEnFiscaliaEstadoTramitacion: {type: String, optional: true},
  denunciaEnJuzgado: {type: Boolean, optional: true, label: TAPi18n.__('¿Ha puesto denuncia en el Juzgado?'),
                      autoform: {afFieldInput: {type: 'boolean-radios', trueLabel: TAPi18n.__('Sí'), falseLabel: TAPi18n.__('No')}}},
  denunciaEnJuzgadoEstadoTramitacion: {type: String, optional: true},
  photos: {
    type: [String],
    optional: true
  },
  'photos.$': {
    autoform: {
      afFieldInput: {
        type: 'multiFileUpload',
        accept: 'image/*',
        collection: 'Photos'
      }}
  },
  attachs: {
    type: [String],
    label: 'Documentos relacionados que quieran aportar', optional: true
  },
  'attachs.$': {
    autoform: {
      afFieldInput: {
        type: 'multiFileUpload',
        collection: 'Attachs'
      }}
  },
  createdAt: defaultCreatedAt,
  updatedAt: defaultUpdateAt,
  lastModified: { type: Date, optional: true }, /* Used by revisions */
  // https://github.com/todda00/meteor-friendly-slugs/issues/1
  friendlySlugs: {
    type: Object,
    optional: true,
    blackbox: true
  },
  slug: {
    type: String,
    optional: true
  },
  revisions: {
    type: [Object],
    blackbox: true,
    optional: true
  },
  validated: { type: Boolean, optional: false, index: 1, defaultValue: false }
});

Persons.attachSchema(Schema.Persons);

// Add revision control to Persons so we can restore previous versions
Persons.attachCollectionRevisions();

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  // Mejorar con: http://docs.meteor.com/#/full/allow

  Persons.allow({
    insert: function () {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      if (Roles.userIsInRole(userId, ['admin']) || doc.familiar === userId) {
        return true;
      }
      return false;
    },
    remove: function (userId, doc) {
      return Roles.userIsInRole(userId, ['admin']) || doc.familiar === userId;
    }
  });
}

if (Meteor.isClient) {
  // https://github.com/aldeed/meteor-autoform#should-the-value-of-schema-and-collection-have-quotation-marks-around-it
  Template.registerHelper('Schema', Schema);
}

if (Meteor.isServer) {
  // https://github.com/matb33/meteor-collection-hooks
  Persons.after.insert(function (userId, doc) {
    // console.log('Enlazando usuario que registra con bebe para mostrar sugerencias');
    // recEngine.link(userId, doc._id);
    // TODO: in future use predition.io
  });
}

var onlyFields = { fields: {
  _id: 1,
  buscasBebe: 1,
  parentesco: 1,
  familiar: 1,
  // nombreCompleto: 1,
  fechaNacimiento: 1,
  fechaNacimientoEsAprox: 1,
  sexo: 1,
  lugarNacimiento: 1,
  lugarNacimientoDireccion: 1,
  lugarNacimientoProvincia: 1,
  lugarNacimientoProvinciaNombre: 1,
  lugarNacimientoMunicipio: 1,
  lugarNacimientoMunicipioNombre: 1,
  lugarNacimientoPais: 1,
  lugarNacimientoLatitud: 1,
  lugarNacimientoLongitud: 1,
  fechaFallecimiento: 1,
  fechaFallecimientoEsAprox: 1,
  // nombreCompletoMadre: 1,
  // nombreCompletoPadreOConyuge: 1,
  motivoMuerte: 1,
  vistoCadaver: 1,
  noVistoCadaverRazon: 1,
  noVistoCadaverOtrasRazones: 1,
  entierroPorHospital: 1,
  entierroPorHospitalMotivos: 1,
  entierroPorHospitalOtrasRazones: 1,
  cementerioEnterrado: 1,
  cementerioEnterradoLatitud: 1,
  cementerioEnterradoLongitud: 1,
  posibilidadPruebasADN: 1,
  sepulturaTemporalPruebasADN: 1,
  enOsarioComun: 1,
  enOsarioComunDesdeFecha: 1,
  motivosSospecha: 1,
  nombreCompletoMedico: 1,
  nombreCompletoMatrona: 1,
  nombreCompletoEnfermera: 1,
  nombreOtroPersonalMedico: 1,
  nombreFuncionariosRegCivil: 1,
  nombreFuncionariosCementario: 1,
  nombreTrabajadoresFuneraria: 1,
  nombreOtrosFuncionariosOTrabajadores: 1
  /* gestionesRealizadasYDocumentos: 1,
   denunciaEnComisaria: 1,
   denunciaEnComisariaEstadoTramitacion: 1,
   denunciaEnFiscalia: 1,
   denunciaEnFiscaliaEstadoTramitacion: 1,
   denunciaEnJuzgado: 1,
   denunciaEnJuzgadoEstadoTramitacion: 1,
   createdAt: 1,
   updatedAt: 1 */
}};

addApiRoute('/bebe/:_id', Persons, onlyFields, '_id');
addApiRoute('/bebes', Persons, onlyFields);

Persons.friendlySlugs(
  {
    slugFrom: 'nombreCompleto',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
