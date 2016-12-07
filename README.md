# Hyper Test

Hyper Test is a REST API testing tool. It ingests an API's [Swagger Specification](https://github.com/OAI/OpenAPI-Specification) and with as little input from the developer as possible, performs tests against the API to ensure that the API actually corresponds to the specfication.

## Stack

This project uses the following technologies:

* Language / base framework: Node.js
* HTTP server: [hapi.js](http://hapijs.com/)
* Job queue: TBD
* Testing engine: [Dredd](https://github.com/apiaryio/dredd)
* Database: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](http://mongoosejs.com/)
* Style Guide: [JavaScript Standard Style](http://standardjs.com/index.html)

## Documentation

In the `documentation/examples/` folder you can find some example objects of the different data types that this project uses such as a parsed Swagger spec or the Dredd request transaction object.

## Installation

TBD

* Make sure you have a MongoDB instance running.

## Running

TBD

## Manual Testing

You can see the default configuration values in `config.js` and you can override them through environment variables. Please don't alter the `config.js` file in any way!

You should have [Bunyan](https://github.com/trentm/node-bunyan) installed globally so you can see the logs (`npm install -g bunyan`).

Make sure to have the CN Hyper Test API projects running:

* https://github.com/Cloudoki/cn-hyper-test-api
* https://github.com/Cloudoki/cn-hyper-test-blm

Create the test database seed:

    NODE_PATH=. node database/seeds/projects.js | bunyan

Run the Hyper Test project with:

    npm start | bunyan

Check the output logs and find the `_id` that was given to the inserted test documents.

Run a manual deployment hook by performing a request like shown below (make sure to change the `<_id>` placeholder with the correct value from the logs):

    curl 'http://localhost:3000/api/v1/hooks/tiagotest?project=<_id>&environment=local'

