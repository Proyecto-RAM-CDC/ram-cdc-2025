# Bienvenido a Remix

* [Documentación de Remix](https://remix.run/docs)
* [Descripción general de Netlify Functions](https://docs.netlify.com/functions/overview)

## Configuración de Netlify

1. Instalar la [CLI de Netlify](https://docs.netlify.com/cli/get-started/):

   ```sh
   npm i -g netlify-cli
   ```

   Si ya tenías instalada la CLI de Netlify, actualízala a la última versión:

   ```sh
   npm i -g netlify-cli@latest
   ```

2. Regístrate e inicia sesión en Netlify:

   ```sh
   netlify login
   ```

3. Crea un nuevo sitio:

   ```sh
   netlify init
   ```

## Desarrollo

Asegúrate de que todos los paquetes estén instalados ejecutando:

```sh
npm install
```

Ejecuta:

```sh
netlify dev
```

Abre [http://localhost:8888](http://localhost:8888) ¡y estarás listo para comenzar!

### Servir el sitio localmente

Para servir tu sitio localmente en un entorno similar a producción, ejecuta:

```sh
netlify serve
```

Tu sitio estará disponible en [http://localhost:8888](http://localhost:8888). Ten en cuenta que no se recargará automáticamente cuando hagas cambios.

## Despliegue

Existen dos formas de desplegar tu aplicación en Netlify: puedes vincular tu aplicación a tu repositorio git y hacer que se despliegue automáticamente con cada cambio, o puedes desplegarla manualmente. Si ya seguiste las instrucciones de configuración, solo necesitas ejecutar:

```sh
# despliegue de vista previa
netlify deploy --build

# despliegue en producción
netlify deploy --build --prod
```

## Mis Notas - 2025/01/13

Configuré esto siguiendo las instrucciones de [Remix en Netlify](https://docs.netlify.com/frameworks/remix/), es decir, el soporte oficial de frameworks ofrecido por Netlify.

### Packages.json

Ejecutar `npx ncu` permite combinar `"@netlify/remix-adapter": "^2.6.0"` y `"vite": "^6.0.7"`. Sin embargo, esto causa un conflicto que impide que el despliegue en Netlify funcione. Después de resolverlo, el despliegue fue exitoso. Cabe destacar que la versión 2.6.0 es la última de `@netlify/remix-adapter`, así que me parece correcto dejar que esa decisión guíe la configuración.

### Instalación de Tailwindcss

* Como esta configuración utiliza Remix Vite, integré Tailwind mediante el [soporte PostCSS integrado en Vite](https://vite.dev/guide/features#postcss).
* Esa documentación no explica mucho, solo menciona `postcss.config.js`.
* Por ello consulté la documentación de Tailwind, en la sección sobre [uso con PostCSS](https://tailwindcss.com/docs/installation/using-postcss).

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

y todo lo demás lo copié desde la versión anterior del proyecto, es decir `app/styles/tailwind_input.css`.

* Después instalé:
  `npm install -D @tailwindcss/forms`
  `npm install -D @tailwindcss/typography`
  `npm i -D daisyui@latest`
* Finalmente, con DaisyUI se recomienda instalar:
  `npm i theme-change --save`

### Configurar ESLint para reconocer interfaces de TypeScript

Actualiza tu configuración de ESLint para usar `@typescript-eslint/eslint-plugin` y desactiva globalmente la regla `react/prop-types` si utilizas TypeScript para validación de props.

1. Instala los plugins necesarios de ESLint:

   ```bash
   npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

2. Actualiza tu configuración en `.eslintrc`:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "react/prop-types": "off"
  }
}
```

Te recomiendo añadir la sección `rules` tanto a la configuración base como a los overrides de TypeScript.

### Configuración de Prisma

* Instalar Prisma:

```bash
npm install prisma --save-dev
```

* Copiar el archivo `.env` del proyecto anterior.

* Instalar el cliente Prisma:

```bash
npm install @prisma/client
```

* Instalar "prisma-dbml-generator":

```bash
npm install -D prisma-dbml-generator
```

* Nota importante:

  * `"prisma"` y `"prisma-dbml-generator"` van en `"devDependencies"`.
  * `"@prisma/client"` va en `"dependencies"`.
    Esto es correcto porque `@prisma/client` es usado en tiempo de ejecución por la aplicación para interactuar con la base de datos, mientras que `prisma` y `prisma-dbml-generator` son herramientas de desarrollo.

* Comandos útiles:

  * `npx prisma generate`
  * `npx prisma db push`

  Usar `npx prisma generate` seguido de `npx prisma db push` es válido en desarrollo o en entornos donde no sea necesario mantener historial de migraciones.
  Sin embargo, en producción se recomienda usar Prisma Migrations:

  * `npx prisma migrate dev` (desarrollo)
  * `npx prisma migrate deploy` (producción).

### Conexión a Mongo Atlas

* Usé mi [correo de CDC RAM](william-cdc-ram@outlook.com) para crear una cuenta en Mongo Atlas.
* Seleccioné la opción gratuita M0: almacenamiento 512 MB, RAM compartida, vCPU compartido.
* Llamé al clúster "CDCRAM2025" en AWS (región N. Virginia, us-east-1).
* Usuario de la base de datos: `williamcdcram` (contraseña disponible en el archivo `.env`).
* Para conectarme a "CDCRAM2025" usé la opción "Drivers" seleccionando "Node.js".
  Instalé `mongodb` con `npm install mongodb`.
  La cadena de conexión fue inicialmente:

  ```bash
  mongodb+srv://williamcdcram:<password>@cdcram2025.ta4de.mongodb.net/?retryWrites=true&w=majority&appName=CDCRAM2025
  ```

  Pero esta no funcionó con `npx prisma db push`. Fue necesario añadir el nombre de la base de datos.
  La cadena correcta es:

  ```bash
  mongodb+srv://williamcdcram:<password>@cdcram2025.ta4de.mongodb.net/CDCRAM2025?retryWrites=true&w=majority&appName=CDCRAM2025
  ```
