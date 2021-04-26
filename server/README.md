# SIAT Server

## Prerequisites
- [NestJS (Version 7.6)](https://docs.nestjs.com/#installation)
- [Postgresql](https://www.postgresql.org/)

## Configuration
For the connection to the database, the API uses TypeORM with a [*ormconfig*](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md) file setup on the root of the project to store the connection options that are going to be used on the running environment, the supported file formats are: `.json`, `.js`, `.ts`, `.env`, `.yml` and `.xml`.

For our use case, the following parameters are needed (JSON as example):
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "pass",
  "database": "database_name",
  "entities": ["src/**/*.entity{.ts,.js}", "dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application should be running locally at port **8000**.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
