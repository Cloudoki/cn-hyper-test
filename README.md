# Hyper Test

Hyper Test is a REST API testing tool. It ingests an API's [Swagger Specification](https://github.com/OAI/OpenAPI-Specification) and with as little input from the developer as possible, performs tests against the API to ensure that the API actually corresponds to the specfication.

The project is made up of three main components:

### Web Server

The web server is responsible for managing all projects and respective testing environments and receiving webhook HTTP requests.

The supported webhook types are "push" and "deploy" and are handled by the workers as described in the next section.

### Workers

#### Deploy webhook handler

When the web server receives a deploy webhook, it creates a job that will be handled by this worker.

The job consists in parsing the remote API's Swagger docs and actually performing the API tests.

#### Push webhook handler

After the web server has received and stored the Git push webhook object in the database, this worker executes the rest of the work which at this moment is nothing.

## Stack

This project uses the following technologies:

* Language / base framework: [Node.js](https://nodejs.org/)
* HTTP server: [hapi.js](http://hapijs.com/)
* Job queue: [Kue](https://github.com/Automattic/kue)
* Testing engine: [Dredd](https://github.com/apiaryio/dredd)
* Database: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](http://mongoosejs.com/)
* Logger: [bunyan](https://github.com/trentm/node-bunyan)
* Style Guide: [JavaScript Standard Style](http://standardjs.com/index.html)

## Installation

#### Prerequisites:

* Node.js, installation through [nvm](https://github.com/creationix/nvm) is recommended.
* MongoDB ([Linux](https://docs.mongodb.com/manual/administration/install-on-linux/), [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)).
* Redis ([Linux](https://www.linode.com/docs/databases/redis/deploy-redis-on-ubuntu-or-debian), [macOS](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298))

#### Node modules / dependencies:

    npm install

Logs are written to `stdout` as JSON strings with the [bunyan](https://github.com/trentm/node-bunyan) logger. Install it globally to view logs in a human-readable format

    npm install -g bunyan

## Running

To run the web server, execute:

    npm start | bunyan

To run the "deploy" webhook worker, run:

    npm start-deploy-handler | bunyan

## Manual Testing

You can see the default configuration values in `config.js` and you can override them through environment variables. Please don't alter the `config.js` file in any way!

You should have [bunyan](https://github.com/trentm/node-bunyan) installed globally so you can see the logs (`npm install -g bunyan`).

Make sure to have the CN Hyper Test API projects running:

* https://github.com/Cloudoki/cn-hyper-test-api
* https://github.com/Cloudoki/cn-hyper-test-blm

Create the test database seed:

    NODE_PATH=. node database/seeds/projects.js | bunyan

Run the Hyper Test project with:

    npm start | bunyan

Check the output logs and find the `_id` that was given to the inserted test documents.

Run a manual deployment hook by performing a request like shown below (make sure to change the `{_id}` placeholder with the correct value from the logs):

    curl -X POST "http://localhost:3000/api/v1/hooks/deploy/{_id}?environment=local"

## Production installation

In production, the main web server and the workers must be daemonized so that they start up once the system boots and are restarted if they crash. The current install uses [pm2](http://pm2.keymetrics.io/) for this purpose. You can find an example PM2 `.json` config in this repo's `production/pm2/ecosystem.json` file.

The current install is available at [https://hyper-test.cloudoki.com](https://hyper-test.cloudoki.com).

**For more specific information about the production installation, visit this project's wiki page.**

## REST API Documentation

This project provides its own API documentation in Swagger format. It can be viewed by running the HTTP server (`npm start`) and visiting the following links:

* HTML: http://localhost:3000/documentation
* JSON: http://localhost:3000/swagger.json

## Development Documentation

As explained in the top section, this project is an automatic REST API testing tool.

The base testing engine is [Dredd](https://github.com/apiaryio/dredd). However, there are some features that Dredd doesn't implement and for which we implemented workarounds.

### Added features

#### OpenAPI `security` parsing

As described in [this issue](https://github.com/apiaryio/dredd/issues/675), Dredd does not read the [security definitions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityDefinitionsObject) nor the [security requirements](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityRequirementObject) parameters which we need to dynamically inject the appropriate authentication tokens for each API call.

As a workaround, we're "manually" fetching and parsing the Swagger spec of each API during testing, matching the security information with each of the tests that will be pefromed by Dredd and injecting the correct authentication information in the Dredd [transaction](http://dredd.readthedocs.io/en/latest/data-structures/#transaction-object) objects.

#### Swagger extensions

In order to support more complex features, we have defined new Swagger vendor extensions that are described in the following sections.

##### `x-hyper-dependency-settings`

The `x-hyper-dependency-settings` extension allows defining that a given parameter of the request should use a value generated by a preivous request. [For instance](https://github.com/Cloudoki/cn-hyper-test-api/blob/e6955140b1d0b43515058c5ce4f7c24e51a1681a/src/api/routes/users.yaml#L54), in a `DELETE /resources/{id}` request, the `{id}` parameter should dynamically be set to equal the `id` returned in the body of the `POST /resources` request.

Example:

    x-hyper-dependency-settings:
      -
        parameter:
          $ref: "#/parameters/id"
        operationId: postAccountUser
        param: "data.id"
        in: body

##### `x-hyper-skip`

The `x-hyper-skip` extension allows marking a test to be skipped. Either the [whole test](https://github.com/Cloudoki/cn-hyper-test-api/blob/e6955140b1d0b43515058c5ce4f7c24e51a1681a/src/api/routes/accounts.yaml#L78) can be skipped or a [single response type](https://github.com/Cloudoki/cn-hyper-test-api/blob/e6955140b1d0b43515058c5ce4f7c24e51a1681a/src/api/routes/accounts.yaml#L116).

Example:

    x-hyper-skip: true

### Data examples

In the `documentation/examples/` folder you can find some example objects of the different data types that this project uses such as a parsed Swagger spec or the Dredd request transaction object.

### Decisions

* Web server is Hapi and not Express because its declaration-based configuration trumps Express' code-based one and for larger projects, Hapi should be easier to maintain (in Tiago Alves' opinion, at least).
* The Worker queue is Kue (with a Redis backend) because it's the usual choice for Node.js programs. I tried using [Celery](http://www.celeryproject.org/) through [node-celery](https://github.com/mher/node-celery) but wasn't able to get everything working correctly. This module only enqueues tasks and [doesn't de-queue them](https://github.com/mher/node-celery/issues/15). The idea is that an actual Python Celery client is used for the workers. It should however be possible as described [here](http://stackoverflow.com/questions/21211848/creating-a-celery-worker-using-node-js) but I wasn't able to get that working either. After working a few hours on this, I moved on.

### Known issues / difficulties

* Adding a new project / API to be tested still needs to be done manually in the database.
* OAuth client has not been implemented yet. That is, the OAuth Access Tokens we need from the API to test need to be generated manually or in a "fake" way and injected manually into our database.
* Regarding the usage of the [Hyper Test API](https://github.com/Cloudoki/cn-hyper-test-api) as a testing target:
    * It seems that the Hyper Test API's access tokens are only valid for 2 weeks. Hyper Test does not refresh OAuth Access Tokens.
    * The Hyper Test API project has create and delete user endpoints. However, the user can't be deleted because that operation has an authorization check where users can only remove themselves. So, to get this to work, we would have to perform the OAuth authorization on behalf of the created user to get its OAuth access_token and perform the `delete user` request with it. This is out of scope right now. Consequently, a new user is left in the database after each test run.
    * I had to set the `DELETE /0/accounts/1` test to skip since we don't have an account creation endpoint and would thus only be able to test this DELETE endpoint once.
* Sometimes subsequent tests yield different results and we haven't found the reason why.
