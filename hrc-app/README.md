## HRC APP


### Table of Contents
1. [About](about)
8. [For Developers](#developers)
    - [Technologies](#technologies)
    - [Dev Setup](#setup)
    - [Deploy](#deploy)


<a name="about" />

### About
HRC App


<a name="developers" />

### For Developers

<a name="technologies" />

#### Technologies
- Remix - React full stack framework 
  -  [Intro To Remix](https://dev.to/shafspecs/intro-to-remix-41l7)
  -  [Remix docs](https://remix.run/docs) 
  -  [Remix Vite Docs](https://remix.run/docs/en/main/future/vite)
- Conform/Zod - Forms and schema validation
  -   [Conform docs](https://remix.run/resources/conform)
  -   [Zod docs](https://zod.dev/)
- Prisma - database ORM - used for CRUD operation on the db, initialize the database, seed data, and carry out any db migrations
  -  [Prisma Docs](https://www.prisma.io/docs)
  -  [Debugging](https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/debugging)
- PostgreSQL - database 
  -  [PostgreSQL Docs](https://www.postgresql.org/docs/)


<a name="developers" />

#### Dev Setup
TODO: Auth, DB Migrations, CI/CD, Formik?(form handling)

This project required that you have nodejs >= 18.0.0 installed in your environment.

__Note__: The followiing commands might work slightly differently on your local machine. eg `npx prisma generate` instead of `prisma generate`.

Navigate to the `/hrc-app` folder and install dependencies.
```sh
  npm install 
```

Create a new database in your postgres server. Create an environment file `.env` and set your postgres url
```
  DATABASE_URL="<YOUR_POSTGRES_CONNECTION_URL>"
```

Generate the prisma client based on the database schema. See `/prisma/schema.prisma`
```sh
prisma generate
```

Update your db schema.
```sh
prisma db push
```
__NOTE__: this command should never be used in prod.

__Optional__ Seed the database with default values. See `/prisma/seed/`
```sh
prisma db seed
```

Run the dev Server
```sh
  npm run dev 
```