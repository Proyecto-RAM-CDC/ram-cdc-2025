# Welcome to Remix

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions Overview](https://docs.netlify.com/functions/overview)

## Netlify Setup

1. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

    ```sh
    npm i -g netlify-cli
    ```

    If you have previously installed the Netlify CLI, you should update it to the latest version:

    ```sh
    npm i -g netlify-cli@latest
    ```

2. Sign up and log in to Netlify:

    ```sh
    netlify login
    ```

3. Create a new site:

    ```sh
    netlify init
    ```

## Development

Ensure all packages are installed by running:

```sh
npm install
```

Run

```sh
netlify dev
```

Open up [http://localhost:8888](http://localhost:8888), and you're ready to go!

### Serve your site locally

To serve your site locally in a production-like environment, run

```sh
netlify serve
```

Your site will be available at [http://localhost:8888](http://localhost:8888). Note that it will not auto-reload when you make changes.

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need to do is run this:

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```

## My Notes - 2025/01/13

I set this up following the instructions [Remix on Netlify](https://docs.netlify.com/frameworks/remix/) i.e. the official frameworks support offered by Netlify.

### Packages.json

Note that running `npx ncu` will allow a combination of `"@netlify/remix-adapter": "^2.6.0"` and `"vite": "^6.0.7"`. However, this causes a conflict, which will prevent the build deploying on Netlify. This then deployed successfully. As an aside I note that version 2.6.0 is indeed the latest version of `@netlify/remix-adapter`, thus I'm happy with letting that drive this decision.

### Installing Tailwindcss

- Since this setup is using Remix Vite, I take the route that Tailwind can be integrated using [Vite's built-in PostCSS support](https://vite.dev/guide/features#postcss).
- That documentation doesn't really tell you much, other than mentioning `postcss.config.js`.
- Thus I turn to Tailwind's own documentation, specifically the section about [using PostCSS](https://tailwindcss.com/docs/installation/using-postcss).

```Bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

and everything else can be copied over from the older version of the project i.e. `app/styles/tailwind_input.css`.

- Next, install `npm install -D @tailwindcss/forms` and `npm install -D @tailwindcss/typography` and `npm i -D daisyui@latest`.
- Finally, with DaisyUI it is recommended to install `npm i theme-change --save`.

### Configure ESLint to recognize TypeScript interfaces

Update your ESLint configuration to use the @typescript-eslint/eslint-plugin and disable the react/prop-types rule globally if you are using TypeScript for prop validation.

1. Install the necessary ESLint plugins:
`npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`

2. Update your .eslintrc configuration.

```Bash
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
```

I would add to this that actually you should add the `rules` to both the base config and the TypeScript overrides.

### Prisma setup

- Install Prisma.

```Bash
npm install prisma --save-dev
```

- Copy over `.env` from the old project.

- Install Prisma client.

```Bash
npm install @prisma/client
```

- Install "prisma-dbml-generator"

```Bash
npm install -D prisma-dbml-generator
```

- So you'll notice that "prisma" and "prisma-dbml-generator" are in the "devDependencies" section of your `package.json` file - yet "@prisma/client" is in the "dependencies" section. This is correct, because, "@prisma/client" is the library that your application uses at runtime to interact with the database ... while ... "prisma" and "prisma-dbml-generator" are tools used during development for generating and managing the database schema, so they belong in "devDependencies".

- Note:
  `npx prisma generate`
  `npx prisma db push`
  - Using `npx prisma generate` followed by `npx prisma db push` is a valid approach, especially during development or when working with databases that do not require migration files for version control.
  - `npx prisma generate` is used to generate or update the Prisma Client based on your Prisma schema. This step ensures that the Prisma Client matches your current schema definition, allowing you to use the latest models and fields in your application code.
  - `npx prisma db push` is used to update the database schema to match your Prisma schema without creating migration files. This command is particularly useful for quick prototyping, testing changes, or when working in environments where maintaining migration history is not necessary.
  - However, for production environments or when you need to maintain a history of schema changes, it's recommended to use Prisma Migrations with `npx prisma migrate dev` (for development) and `npx prisma migrate deploy` (for production). Migrations ensure that schema changes are version-controlled and can be applied consistently across different environments.

- I used my [CDC RAM email address](william-cdc-ram@outlook.com) to create a new account for Mongo Atlas.
  - Select the M0 Free option. Storage is 512 MB, RAM is shared, and vCPU is also shared.
  - I set the cluster name to "CDCRAM2025" on AWS, region N. Virginia (us-east-1).
  - Database user has username `williamcdcram` (for the password see the database URL in the `.env` file).
  - To connect to "CDCRAM2025" I used the "Drivers" option, selecting "Node.js". This required I install mongodb with `npm install mongodb` and that the connection string was `mongodb+srv://williamcdcram:<password>@cdcram2025.ta4de.mongodb.net/?retryWrites=true&w=majority&appName=CDCRAM2025`. The password for `williamcdcram` is included in the connection string for your first time setup. This password will not be available again after exiting this connect flow.
  - Actually, the connection string they provided didn't work when I used `npx prisma db push`. I needed to add the actual name of the database. Thus, the correct database URL (see `.env` is ) `"mongodb+srv://williamcdcram:<password>@cdcram2025.ta4de.mongodb.net/CDCRAM2025?retryWrites=true&w=majority&appName=CDCRAM2025"`.