# 2025-09-03 Proyecto RAM CDC 2025 (Español)

Este proyecto es una aplicación web full-stack construida con [Remix](https://remix.run/) para el proyecto CDC RAM. Usa **TypeScript**, **Prisma** y **MongoDB Atlas** en el backend, con **React + Tailwind CSS** en el frontend.

Esta guía está escrita para alguien que configura el proyecto por primera vez, incluso si nunca antes ha instalado Node.js.

---

## 1. Instalar Requisitos Previos

Antes de trabajar con el código, necesitas instalar algunas herramientas:

### Node.js y npm

* El proyecto requiere **Node.js versión 18 o superior**.

* Instala [Node.js](https://nodejs.org/en/download). Esto también instalará **npm** (Node Package Manager).

* Verifica la instalación:

  ```bash
  node -v
  npm -v
  ```

  Debes ver una versión de Node ≥18 y npm ≥9.

### Git

Necesitas Git para clonar el repositorio:

```bash
git --version
```

Si no está instalado, descárgalo de [git-scm.com](https://git-scm.com/).

---

## 2. Clonar el Repositorio

Usa Git para copiar el proyecto desde GitHub a tu computadora:

```bash
git clone https://github.com/Proyecto-RAM-CDC/ram-cdc-2025
cd ram-cdc-2025
```

---

## 3. Configurar la Base de Datos

Este proyecto usa **MongoDB Atlas** (MongoDB alojado en la nube).

### Paso A: Crear una cuenta en Atlas

* Ve a [MongoDB Atlas](https://www.mongodb.com/atlas/database) y regístrate (el nivel gratuito funciona).
* Crea un **nuevo clúster** (elige el clúster gratuito compartido).
* Crea un **usuario de base de datos** y anota el usuario y la contraseña.
* Agrega tu dirección IP a la lista de IPs permitidas.

### Paso B: Cadena de conexión

MongoDB te da una cadena de conexión como:

```bash
mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/DATABASE_NAME
```

### Paso C: Configurar variables de entorno

Copia el archivo `.env-structure` del proyecto y renómbralo a `.env`. Luego edítalo:

```bash
cp .env-structure .env
```

Dentro de `.env`, reemplaza los valores de ejemplo:

```dotenv
DATABASE_URL="tu cadena de conexión de MongoDB aquí"
SESSION_SECRET="elige_una_cadena_secreta_larga_aleatoria"
```

`SESSION_SECRET` es solo una cadena aleatoria usada para seguridad (puedes generarla con cualquier generador de contraseñas).

---

## 4. Instalar Dependencias

Ahora instala los paquetes de Node del proyecto:

```bash
npm install
```

Esto lee `package.json` e instala todo lo que la app necesita.

---

## 5. Configurar Prisma

Prisma es un ORM (Object-Relational Mapper) que permite al código comunicarse con MongoDB.

Ejecuta:

```bash
npx prisma generate
```

Esto genera el cliente Prisma a partir del esquema en `schema.prisma`.

(Opcional) Puedes inspeccionar tu base de datos con:

```bash
npx prisma studio
```

Esto abre una interfaz web para navegar las colecciones de MongoDB.

---

## 6. Sembrar la Base de Datos (Opcional, Solo la Primera Vez)

El proyecto incluye scripts para precargar datos (antimicrobianos, bacterias, etc.). Puedes ejecutarlos uno por uno:

```bash
node scripts/seedAntiMicrobianos.js
node scripts/seedBacterias.js
node scripts/seedGeneFamilies.js
node scripts/seedResistanceMechanisms.js
node scripts/seedStates.js
```

Esto llena la base de datos con datos de referencia iniciales.

---

## 7. Ejecutar la App en Desarrollo

Ahora inicia la app localmente:

```bash
npm run dev
```

* El sitio estará disponible en [http://localhost:5173](http://localhost:5173/) (puerto por defecto de Vite).
* Los cambios que hagas en el código se recargarán automáticamente.

---

## 8. Compilar para Producción (Opcional)

Si necesitas probar una compilación de producción:

```bash
npm run build
npm start
```

Esto generará archivos optimizados en el directorio `build/` y los servirá.

---

## 9. Despliegue (Opcional)

Esta app está configurada para [Netlify](https://www.netlify.com/). El archivo `netlify.toml` especifica cómo Netlify debe compilar y servir el proyecto.

---

## 10. Resolución de Problemas

* **Versión incorrecta de Node**: si ves errores como “unsupported engine”, verifica que uses Node ≥18.
* **Errores de Prisma**: asegúrate de que tu `.env` tenga el `DATABASE_URL` correcto y que tu clúster de MongoDB esté en línea.
* **Puerto en uso**: detén cualquier otro proceso que use el puerto 5173.

---

## Tour por Archivos Clave

1. **`.prettierrc`**: reglas de formato automático de código.
2. **`.eslintrc.cjs`**: configuración de ESLint para encontrar errores en JS/TS.
3. **`.gitignore`**: lista de archivos/carpetas que Git no debe subir.
4. **`vite.config.ts`**: configuración de Vite (herramienta de compilación).
5. **`tsconfig.json`**: configuración de TypeScript (verificación de tipos).
6. **`tailwind.config.ts`**: personalización de Tailwind CSS (colores, tipografía, etc.).
7. **`package.json`**: dependencias, scripts y requisitos del proyecto.
8. **`package-lock.json`**: versiones exactas de dependencias.
9. **`global.d.ts`**: definiciones de tipos globales de TypeScript.
10. **`README.md`**: manual de instrucciones del proyecto (el anterior, ahora reemplazado).
11. **`.env`**: secretos y variables de entorno (como `DATABASE_URL`).
12. **`env.d.ts`**: asegura que TypeScript reconozca las variables del `.env`.
13. **`playwright.config.ts`**: configuración de pruebas automatizadas con Playwright.
14. **`netlify.toml`**: cómo construir y desplegar la app en Netlify.
15. **`postcss.config.mjs`**: configuración de PostCSS (Tailwind + Autoprefixer).
16. **`schema.prisma`**: plano de la base de datos (colecciones y campos).

### Recapitulación

* **Configs**: `.prettierrc`, `.eslintrc.cjs`, `.gitignore`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `playwright.config.ts`, `netlify.toml`.
* **Núcleo del proyecto**: `package.json`, `package-lock.json`.
* **Entorno**: `.env`, `env.d.ts`, `global.d.ts`.
* **Documentación**: `README.md`.
* **Base de datos**: `schema.prisma`.

---

## Próximos Pasos

* Explora la carpeta `app/` para ver rutas de Remix, loaders y componentes de React.
* Revisa `schema.prisma` para entender la estructura de los modelos de la base de datos.
* Consulta `tailwind.config.ts` para ver cómo está configurado el tema de la interfaz.
