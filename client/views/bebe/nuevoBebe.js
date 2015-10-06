function getTVal(e, name) {
  return $(e.target).find('[name=' + name + ']').val();
}

Template.nuevoBebe.events({


  'submit form': function(e) {
    e.preventDefault();
    var person = {
      nombreCompleto: getTVal(e, "nombreCompleto"),
      sexo: getTVal(e, "sexo")

       /*
      nombreCompleto: $(e.target).find('[name=nombreCompleto]').val(),
      fechaNacimiento: $(e.target).find('[name=fechaNacimiento]').val(),
      fechaNacimientoEsAprox: $(e.target).find('[name=fechaNacimientoEsAprox]').val(),
      sexo: $(e.target).find('[name=sexo]').val(),
      lugarNacimiento: $(e.target).find('[name=lugarNacimiento]').val(),
      fechaFallecimiento: $(e.target).find('[name=fechaFallecimiento]').val(),
      fechaFallecimientoEsAprox: $(e.target).find('[name=fechaFallecimientoEsAprox]').val(),
      nombreCompletoMadre: $(e.target).find('[name=nombreCompletoMadre]').val(),
      nombreCompletoPadreOConyuge: $(e.target).find('[name=nombreCompletoPadreOConyuge]').val(),
      motivoMuerte: $(e.target).find('[name=motivoMuerte]').val(),
      vistoCadaver: $(e.target).find('[name=vistoCadaver]').val(),
      noVistoCadaverRazon: $(e.target).find('[name=noVistoCadaverRazon]').val(),
      noVistoCadaverOtrasRazones: $(e.target).find('[name=noVistoCadaverOtrasRazones]').val(),
      entierroPorHospital: $(e.target).find('[name=entierroPorHospital]').val(),
      entierroPorHospitalMotivos: $(e.target).find('[name=entierroPorHospitalMotivos]').val(),
      entierroPorHospitalOtrasRazones: $(e.target).find('[name=entierroPorHospitalOtrasRazones]').val(),
      cementerioEnterrado: $(e.target).find('[name=cementerioEnterrado]').val(),
      posibilidadPruebasADN: $(e.target).find('[name=posibilidadPruebasADN]').val(),
      sepulturaTemporalPruebasADN: $(e.target).find('[name=sepulturaTemporalPruebasADN]').val(),
      enOsarioComun: $(e.target).find('[name=enOsarioComun]').val(),
      enOsarioComunDesdeFecha: $(e.target).find('[name=enOsarioComunDesdeFecha]').val(),
      motivosSospecha: $(e.target).find('[name=motivosSospecha]').val(),
      nombreCompletoMedico: $(e.target).find('[name=nombreCompletoMedico]').val(),
      nombreCompletoMatrona: $(e.target).find('[name=nombreCompletoMatrona]').val(),
      nombreCompletoEnfermera: $(e.target).find('[name=nombreCompletoEnfermera]').val(),
      nombreOtroPersonalMedico: $(e.target).find('[name=nombreOtroPersonalMedico]').val(),
      nombreFuncionariosRegCivil: $(e.target).find('[name=nombreFuncionariosRegCivil]').val(),
      nombreFuncionariosCementario: $(e.target).find('[name=nombreFuncionariosCementario]').val(),
      nombreTrabajadoresFuneraria: $(e.target).find('[name=nombreTrabajadoresFuneraria]').val(),
      nombreOtrosFuncionariosOTrabajadores: $(e.target).find('[name=nombreOtrosFuncionariosOTrabajadores]').val(),
      gestionesRealizadasYDocumentos: $(e.target).find('[name=gestionesRealizadasYDocumentos]').val(),
      denunciaEnComisaria: $(e.target).find('[name=denunciaEnComisaria]').val(),
      denunciaEnComisariaEstadoTramitacion: $(e.target).find('[name=denunciaEnComisariaEstadoTramitacion]').val(),
          denunciaEnFiscalia: $(e.target).find('[name=denunciaEnFiscalia]').val(),
      denunciaEnFiscaliaEstadoTramitacion: $(e.target).find('[name=denunciaEnFiscaliaEstadoTramitacion]').val(),
      denunciaEnJuzgado: $(e.target).find('[name=denunciaEnJuzgado]').val(),
      denunciaEnJuzgadoEstadoTramitacion: $(e.target).find('[name=denunciaEnJuzgadoEstadoTramitacion]').val() */
    }
    $.bootstrapGrowl(getTVal(e, "nombreCompleto"));

    check(person, Persons.simpleSchema());
    person._id = Persons.insert(person);
    Router.go('bebePage', { _id: person._id });

    // https://github.com/ifightcrime/bootstrap-growl
    $.bootstrapGrowl("Guardado", {type: 'success', align: 'center'} );
  }
});

Template.nuevoBebe.onRendered(function() {
  AutoForm.resetForm("#nuevoBebeForm");
});
