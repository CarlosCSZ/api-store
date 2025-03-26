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

## Integrating with AWS Bucket
AWS S3 bucket is used to store images. In order to use it follow the steps below:
- Create a bucket in AWS.
- Go to IAM console a create a user specific to your bucket using the following policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my_buckett",
        "arn:aws:s3:::my_bucket/*"
      ]
    }
  ]
}
```
- Create a credential to this user for programatic access. This credential will provides you with the following keys:
> - `AWS_ACCESS_KEY_ID`
> - `AWS_SECRET_ACCESS_KEY`

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
> - `AWS_KEY_ID`
>   - **Description**: The AWS secret key ID
>   - **Type**: string
>   - **Example**: aws_key_id
> - `AWS_SECRET_KEY`
>   - **Description**: The AWS secret key
>   - **Type**: string
>   - **Example**: aws_secret_key
> - `AWS_BUCKET_NAME`
>   - **Description**: The AWS bucket name
>   - **Type**: string
>   - **Example**: my_bucket