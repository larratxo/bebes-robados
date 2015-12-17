# language: es
Característica: Actualización de datos personales

  // @watch
  Escenario: Verifico que puedo actualizar mis datos personales con datos correctos
    Dado que tengo una cuenta y estoy logeado
    Y una lista de datos personales
    | Francisco Javier | javier@example.com |
    Entonces actualizo mi perfil correctamente
