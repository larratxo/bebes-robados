# language: es

Característica: API de obtención de datos

  Escenario: Verifico que puedo acceder a la API y los datos son correctos
    Dado una lista de urls de API y contenidos
    | /api/find/provincias    | Oviedo   |
    | /api/find/person/u/test | test     |
    | /api/find/municipios    | Aranjuez |
    Entonces verifico que al acceder a las urls aparecen esos contenidos

  Escenario: Verifico que puedo acceder a la API y que no hay datos incorrectos
    Dado una lista de urls de API y contenidos
    | /api/find/provincias    | foo |
    | /api/find/person/u/test | foo |
    | /api/find/municipios    | foo |
    Entonces verifico que al acceder a las urls no aparecen esos contenidos
