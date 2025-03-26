# API Store
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Monolithic server for a store application. This server was built using using a modular Clean Architecture approach. It features JWT authentication with an api-key strategy.

## Getting started

### Installation

```bash
$ pnpm install
```

### Running the app

```bash
# on local with watch mode
$ cp env.sample .env
$ pnpm migration:dev
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

### Testing

```bash
# unit tests. For watch mode add: ':watch'
$ pnpm run test

# unit tests on watch mode'
$ pnpm run test:watch

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Environment Variables

> - `HTTP_PORT`
>   - **Description**: Application port
>   - **Type**: string
>   - **Example**: 3000
> - `SHARED_SECRET`
>   - **Description**: The secret key for signing and validating tokens
>   - **Type**: string
>   - **Example**: secret
> - `MONGO_URI`
>   - **Description**: The mongoDB URI to connect
>   - **Type**: string
>   - **Example**: mongodb://username:password@host
> - `DB_NAME`
>   - **Description**: Database within mongoDB
>   - **Type**: string
>   - **Example**: api_store