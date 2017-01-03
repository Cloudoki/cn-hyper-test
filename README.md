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

## Development Documentation

### Data examples

In the `documentation/examples/` folder you can find some example objects of the different data types that this project uses such as a parsed Swagger spec or the Dredd request transaction object.
