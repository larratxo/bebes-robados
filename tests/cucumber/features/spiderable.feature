# language: es
Característica: Esta aplicación debe ser spidreable y generar un sitemap correcto

  Escenario: Verifico que se genera el sitemap correctamente
    Dado la página de sitemap.xml
    Entonces compruebo que existe una lista de páginas en el sitemap
    | /quienesSomos | Quienes    |
    | /donaciones   | Donaciones |
    | /legal        | Legal      |
    | /bebes        | Busqueda   |
    | /persona/test | Datos de   |
    Y que son spiderables
