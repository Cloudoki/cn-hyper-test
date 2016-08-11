# Hyper API testing tool
Testing tool to Restul API's, part of the Hyper platform.

Features:
  - Register testing projects based on one or more repositories
  - Webhook to setup a new test based on the repos commit ID's
  - Type HTTP test units with supertest
  - Send the results via sendgrid

### Requirements

 - node: >=6.0.0
 - npm: >=3.8.1


### Installation:

    $ npm install

### Start

    $ npm start

It will start an server on localhost:8700

### Endpoints

- `POST /promise` The github webhook listener

- `POST /run` The deploy hook body: `{ "component": "moovly-api" }`

- `GET /test` Fake a github push to the server (the `/promise` endpoint) using
the `static/payload.json`  file payload

- `GET /render` Will render the mail template with the data in `views/context-example.json`

### Scripts

- Swayer Script: will parse the `moovly-api` specification and output the swayer procedure
useful for debugging

`node bin/swayer > output.json`

- Worker Script: run a test for the `moovly-api` but without the need for github payloads.
Will not save to the database the result (only output to stdout) and will not send mail

`node bin/worker > output-worker.json`

- Render script: useful for developing the templates will only require dependencies
needed to render the template of the mail

`npm install handlebars express juice html-to-text`

`node bin/render.js`

This will start http server with only the `GET /render` (will reload templates on every request)
and an new endpoint `GET /text` that will render the text format of the email
