# language: es
Característica: Actualización de datos personales

  Antecedentes:
    Dado que estoy en la página inicial
    Y que no estoy logeado

  @watch
  Escenario: Verifico que puedo actualizar mis datos personales con datos correctos
    Dado que me registro con cierto nombre de usuario, contraseña y correo
    Entonces debo estar registrado
    Y debo estar autenticado
    Y unos datos personales
    | Francisco Javier | 00000000N | +3491000000 | ../../public/images/logo200.png |http://twitter.com/comunes/ |
    Entonces actualizo mi perfil correctamente
