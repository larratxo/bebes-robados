# language: es

Característica: Longitudes y latitudes Correctas y otras funciones básicas

  Escenario: Verifico que un número es una latitud correcta
    Dado el número 20.44
    Entonces debe ser una longitud o latitud válida

  Escenario: Verifico que un número negativo es una latitud correcta
    Dado el número -20.44
    Entonces debe ser una longitud o latitud válida

  Escenario: Verifico que un número en formato cadena es una latitud correcta
    Dado el número "20.44"
    Entonces debe ser una longitud o latitud válida

  Escenario: Verifico que un número en formato cadena negativa es una latitud correcta
    Dado el número "-20.44"
    Entonces debe ser una longitud o latitud válida

  Escenario: Verifico que una palabra no es una latitud correcta
    Dado la cadena "veinte"
    Entonces no debe ser una longitud o latitud válida

  Escenario: Verifico que un objecto no definido se detecta
    Dado un objeto no definido
    Entonces se debe detectar

  Escenario: Verifico que un objecto nulo se detecta
    Dado un objeto nulo
    Entonces se debe detectar

  Escenario: Verifico que un objecto no nulo no se detecta como undefinido
    Dado un objeto no nulo
    Entonces se debe detectar como no undefinido
