# language: es
Característica: Alta de bebes correcta

  @watch
  Escenario: Verifico que un bebe que se busca se puede dar de alta con la información básica
    Dado una lista de bebes que se buscan
    | Francisco Javier                              | Hombre      | F | Murcia   | Cartagena | Hospital | Marta   | Germán  |
    | María Gómez                                   | Mujer       | F | Madrid   | Alcorcón  | Hospital | María   | Luis    |
    | Feliciano Fernández-Alvarez de la Hoz Hermoso | Desconocido | B | Asturias | Gijón     | Hospital | Justina | Teodoro |
    | Federico Trino                                | Hombre      | B | Cordoba  | Rute      | Hospital | Ana     | Gerardo |
    Entonces se debe de poder dar de alta correctamente
