# 2025-09-03 Proyecto RAM CDC 2025 (Inglés)

This project is a full-stack [Remix](https://remix.run/) web application built for the CDC RAM project. It uses **TypeScript**, **Prisma**, and **MongoDB Atlas** on the backend, with **React + Tailwind CSS** for the frontend.

This guide is written for someone setting up the project for the very first time - even if you’ve never installed Node.js before.

---

## 1. Install Prerequisites

Before working with the code, you need some tools installed:

### Node.js and npm

- The project requires **Node.js version 18 or later**.

- Install [Node.js](https://nodejs.org/en/download). This will also install **npm** (Node Package Manager).

- Verify installation:

    ```bash
    node -v
    npm -v
    ```

    You should see a version of Node ≥18 and npm ≥9.

### Git

You’ll need Git to clone the repository:

```bash
git --version
```

If not installed, download it from [git-scm.com](https://git-scm.com/).

---

## 2. Clone the Repository

Use Git to copy the project from GitHub onto your machine:

```bash
git clone https://github.com/Proyecto-RAM-CDC/ram-cdc-2025
cd ram-cdc-2025
```

---

## 3. Set Up the Database

This project uses **MongoDB Atlas** (a cloud-hosted MongoDB).

### Step A: Create an Atlas account

- Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and sign up (free tier works).

- Create a **new cluster** (pick the free shared cluster).

- Create a **database user** and note the username/password.

- Add your IP address to the allowed IPs list.

### Step B: Connection string

MongoDB gives you a connection string like:

```bash
mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/DATABASE_NAME
```

### Step C: Configure environment variables

Copy the `.env-structure` file from the project and rename it `.env`. Then edit it:

```bash
cp .env-structure .env
```

Inside `.env`, replace the sample values:

```dotenv
DATABASE_URL="your MongoDB connection string here"
SESSION_SECRET="choose_a_random_long_secret_string"
```

The `SESSION_SECRET` is just a random string used for security (you can generate one with any password generator).

---

## 4. Install Dependencies

Now install the project’s Node packages:

```bash
npm install
```

This reads from `package.json` and installs everything the app needs.

---

## 5. Set Up Prisma

Prisma is an ORM (Object-Relational Mapper) that lets the code talk to MongoDB.

Run:

```bash
npx prisma generate
```

This generates the Prisma client from the schema in `schema.prisma`.

(Optional) You can inspect your database with:

```bash
npx prisma studio
```

This opens a web UI to browse MongoDB collections.

---

## 6. Seed the Database (Optional, First-Time Only)

The project includes scripts to pre-load data (antimicrobials, bacteria, etc.). You can run them one by one:

```bash
node scripts/seedAntiMicrobianos.js
node scripts/seedBacterias.js
node scripts/seedGeneFamilies.js
node scripts/seedResistanceMechanisms.js
node scripts/seedStates.js
```

This fills the database with starter reference data.

---

## 7. Run the App in Development

Now start the app locally:

```bash
npm run dev
```

- The site will be available at [http://localhost:5173](http://localhost:5173/) (default Vite port).

- Changes you make to the code will hot-reload automatically.

---

## 8. Build for Production (Optional)

If you need to test a production build:

```bash
npm run build
npm start
```

This will generate optimized files in the `build/` directory and serve them.

---

## 9. Deploying (Optional)

This app is configured for [Netlify](https://www.netlify.com/). The `netlify.toml` file specifies how Netlify should build and serve the project.

---

## 10. Troubleshooting

- **Node version mismatch**: If you see errors like “unsupported engine”, check you are using Node ≥18.
- **Prisma errors**: Ensure your `.env` has the correct `DATABASE_URL` and that your MongoDB cluster is online.
- **Port already in use**: Stop any other process running on port 5173.

---

## Tour

### 1. `.prettierrc`

Think of this as the **style guide for your code**. Prettier is a tool that automatically formats your code so it looks consistent (spaces, quotes, indentation). You don’t _run_ this file, it just tells Prettier what rules to follow.

### 2. `.eslintrc.cjs`

This configures **ESLint**, a tool that spots mistakes in your JavaScript/TypeScript. It helps you avoid bugs and follow good practices. Prettier cares about _style_, ESLint cares about _correctness_.

### 3. `.gitignore`

This is a list of files and folders that Git should ignore (not upload to GitHub). For example, your installed dependencies (`node_modules/`) don’t belong in source control, so `.gitignore` hides them.

### 4. `vite.config.ts`

Vite is the **build tool** that runs your app in development and prepares it for production. This file contains Vite’s settings (how to bundle files, which plugins to use). You usually don’t edit this unless you’re customizing the build.

### 5. `tsconfig.json`

This configures **TypeScript**, which is JavaScript with extra checks (like making sure you don’t pass the wrong kind of value into a function). This file tells TypeScript how strict to be and what parts of the project to check.

### 6. `tailwind.config.ts`

Tailwind CSS is a **styling system**. This file customizes colors, fonts, spacing, and adds plugins like forms or typography. It makes your app look nice while keeping the CSS manageable.

### 7. `package.json`

This is the **heart of any Node project**. It does three big things:

- Lists dependencies (libraries the project needs, like React, Prisma, Tailwind).
- Defines scripts (commands you can run, like `npm run dev` to start the app, `npm run seedall` to load test data).
- Specifies requirements (like needing Node ≥18).

When you run `npm install`, it looks at `package.json` and downloads everything listed there.

### 8. `package-lock.json`

This is the **frozen shopping list**. While `package.json` says _what_ you want, `package-lock.json` locks down the _exact versions_ of dependencies. This ensures that everyone on the team runs the same versions and avoids “works on my machine” problems.

### 9. `global.d.ts`

A TypeScript file for **global type definitions**. If the app uses types that don’t come built-in, this file adds them so TypeScript doesn’t complain.

### 10. `README.md`

This is the **instruction manual** for the project. The old README gave brief setup instructions (Netlify, Prisma, Tailwind). We’re replacing it with a more detailed, junior-friendly one.

### 11. `.env`

This file holds **secrets and environment settings** (like your database password). It’s ignored by Git (thanks to `.gitignore`) so secrets don’t leak online. In this project it contains:

- `DATABASE_URL` (MongoDB connection string)
- `SESSION_SECRET` (used for cookie/session encryption)

### 12. `env.d.ts`

Another TypeScript helper. It makes sure the variables in `.env` are recognized by TypeScript, so you get autocomplete and type checking.

### 13. `playwright.config.ts`

Configures **Playwright**, a tool for running browser tests. For example, it can automatically open Chrome, click buttons, and check that the app works. This file sets the defaults (e.g., use Spanish locale, run tests headlessly).

### 14. `netlify.toml`

Tells **Netlify** how to build and deploy the app. It says:

- Run `npm install`, generate Prisma, then build the app.
- Where to put the built files (`build/client`).
- How to run in development (`npm run dev`).
- How to handle caching for faster performance.

### 15. `postcss.config.mjs`

Config for **PostCSS**, a tool that transforms CSS behind the scenes. Here, it loads Tailwind and Autoprefixer (which adds vendor prefixes so CSS works across all browsers).

### 16. `schema.prisma`

This is the **blueprint for your database**. It describes what collections and fields MongoDB should have (e.g., patients, hospitals, bacteria, resistance mechanisms). Prisma uses this to generate code so you can query the database using JavaScript/TypeScript instead of raw MongoDB queries.

### Recap

- **Configs**: `.prettierrc`, `.eslintrc.cjs`, `.gitignore`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `playwright.config.ts`, `netlify.toml`.
- **Project brain**: `package.json`, `package-lock.json`.
- **Environment**: `.env`, `env.d.ts`, `global.d.ts`.
- **Docs**: `README.md`.
- **Database**: `schema.prisma`.

## Next Steps

- Explore the `app/` folder to see Remix routes, loaders, and React components.

- Review `schema.prisma` to understand how the database models are structured.

- Check `tailwind.config.ts` for how the UI theme is set up.
