[![codecov](https://codecov.io/gh/sbimochan/api-code-compass/branch/dev/graph/badge.svg?token=DI53MR3LK0)](https://codecov.io/gh/sbimochan/api-code-compass)

Comes with:

- [ES6](http://babeljs.io/learn-es2015/) features/modules
- ES7 [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [Bookshelf](http://bookshelfjs.org/) ORM and [Knex](http://knexjs.org/) migrations
- PostgreSQL (default) with support for MySQL and SQLite
- [Docker](https://docs.docker.com/engine/docker-overview/) support for Development and Production
- [ESLint](http://eslint.org/) for code linting
- Request validation using [Joi](https://www.npmjs.com/package/@hapi/joi)
- Code formatting using [Prettier](https://www.npmjs.com/package/prettier)
- Configuration management using [dotenv](https://www.npmjs.com/package/dotenv)
- Logging using [winston](https://www.npmjs.com/package/winston)
- Error reporting using [Sentry](http://npmjs.com/package/@sentry/node)
- Tests using [mocha](https://www.npmjs.com/package/mocha), [supertest](https://www.npmjs.com/package/supertest) and [chai](https://www.npmjs.com/package/chai)
- VS Code built-in [Debugger](https://code.visualstudio.com/docs/nodejs/nodejs-debugging) Support

---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/) / [MySQL](https://www.mysql.com/downloads/) / [SQLite](https://www.sqlite.org/download.html)

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone --depth=1 git@github.com:sbimochan/sample-api.git <application-name>
    $ cd <application-name>
    $ rm -rf .git
    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn migrate
    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ yarn make:migration <name>
    $ yarn make:seeder <name>

Example,

    $ yarn make:migration create_tags_table
    $ yarn make:seeder 02_insert_tags

## Using Docker

### Using docker-compose

Use [docker-compose](https://docs.docker.com/compose/) to quickly bring up a stack with pre-configured Postgres database container. Data is ephemeral and containers will disappear when stack is removed.

Update `.env` file accordingly.

- `0.0.0.0` as `$APP_HOST` to expose app on Docker network interface
- Pre-configured Postgres settings - can be updated to point to another Postgres host

Bring up stack,

    $ docker-compose up

Navigate to http://localhost:8848/api-docs/ to verify application is running from docker.

Bring down stack,

    $ docker-compose down

### Multi-stage docker builds

There are multiple build targets available for different stages. These images can be used to deploy or run jobs in different container based cloud infrastructure like Kubernetes, AWS ECS, Fargate, GCP Cloud Run etc.

1. Building a production image.

   ```bash
   $ docker build --target=prod -t api-code-compass:prod .
   ```

2. Building an image for development.

   ```bash
   $ docker build --target=dev -t api-code-compass:dev .
   ```

3. Building an image that runs migration and/or rollback.

   ```bash
    # Docker image that runs migration and seeds.
    $ docker build --target=migrate -t api-code-compass:migrate .

    # Docker image that rollbacks migrations.
    $ docker build --target=migrate-rollback -t api-code-compass:migrate-rollback .
   ```

Once the images have been built - all you need to do is run them providing a `.env` file. Like this:

```bash
$ docker run -v "/path/to/your/.env:/app/.env" sbimochan/api-code-compass:migrate
```

## Using MySQL instead of PostgreSQL

Install the [mysql](https://www.npmjs.com/package/mysql) driver first.

    $ yarn add mysql

Update these lines in your `.env` file.

```diff
- DB_CLIENT='pg'
+ DB_CLIENT='mysql'

- EXPOSED_DB_PORT='5432'
+ EXPOSED_DB_PORT='3306'
```

You can remove the [pg](https://www.npmjs.com/package/pg) driver if you like to.

    $ yarn remove pg

That's it, you are ready to roll.

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage

## Postman Collection

The postman collection consists of series of tests for this API.

[Click here](https://api-code-compass.postman.co/workspace/API-Code-Compass-Workspace~c9caec1f-bc5c-44c0-8183-4826d8606984/collection/27851431-0a08f0a1-6e96-4fd4-aa88-801b65e4578b?action=share&creator=27851431&active-environment=27851431-0b2e00d4-2886-4a9a-ab71-9114b92c9c9a)

## Why 8848?

Because the highest point in the world is [8848 meters](https://en.wikipedia.org/wiki/Mount_Everest).
