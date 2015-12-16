# Iniciativa de Registro y Búsqueda de Bebes Robados

Software para facilitar el regitro, búsqueda, difusión y denuncia de casos de bebes robados.

## Uso

Este software está desarrollado con [meteor](https://www.meteor.com/), así que simplemente, bájate el código y ejecuta:

```bash
meteor
```

## Instalación

Te recomendamos usar `meteor up` junto con `docker` (mupx).

## Tests

Usamos [CucumberJS](https://github.com/cucumber/cucumber-js) a través de [chimp](https://chimp.readme.io).

```bash
# You should start meteor
meteor
# And later run the tests and watch for changes
cd tests/cucumber
chimp --watch --ddp=http://localhost:3000
```

## Desarrolladores

- [@vjrj](https://github.com/vjrj)

## Licencia

[AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html)
