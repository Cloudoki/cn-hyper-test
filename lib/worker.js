const request = require('request-promise-native');
const Bluebird = require('bluebird');
const url = require('url');
const swayer = require('./swayer');

const rq = request.defaults({
  followRedirect: false,
  json: true,
  headers: {
    'Cache-Control': 'no-cache'
  },
  method: 'GET',
  time: true,
  resolveWithFullResponse: true,
  timeout: 5000,
  simple: false
});

const buildRequest = (request, {
  path,
  method,
  headers,
  host,
  basePath,
  schemes
}) => {
  const uri = url.format({
    protocol: schemes[0],
    host,
    pathname: url.resolve(basePath, path)
  });

  return request({
    uri,
    method,
    headers
  });
};

const execute = (request, test, { attempts, delayAttempt }, { onStatusCode }) =>
  Promise.resolve()
  .then(() => {
    const {
      statusCode,
      validate
    } = test;

    const data = {
      failed: [],
      hooks: [],
      test
    };

    let res;

    const flow = (new Array(attempts)).fill(0).reduce(chain => chain
      .then(executed => {
        if (executed) return executed;
        return buildRequest(request, data.test);
      }).then(response => {
        if (response && response === true) return response;

        res = response;

        if (response.statusCode != statusCode) {
          const hooks = onStatusCode[response.statusCode];
          if (hooks) {
            data.hooks.push({
              statusCode: response.statusCode,
              body: response.body,
              header: response.header,
              elapsedTime: response.elapsedTime
            });
            return Bluebird.mapSeries(hooks, hook => hook()).then(results => {
              results.forEach(result => {
                Object.assign(data.test, result);
              });
              return;
            });
          }
        }

        data.body = response.body;
        data.headers = response.headers;
        data.statusCode = response.statusCode;
        data.elapsedTime = response.elapsedTime;
        data.validation = validate(response);

        return Promise.resolve(true);
      }).catch(err => {
        const { name, message, options } = err;
        const error = { code: name, message, options };
        if (res) {
          error.body = res.body;
          error.headers = res.header;
          error.statusCode = res.statusCode;
          error.elapsedTime = res.elapsedTime;
        }
        data.failed.push(error);
        return Bluebird.delay(delayAttempt);
      }), Promise.resolve());

    return flow.then(executed => {
      data.executed = !!executed;
      return data;
    });
  });

const promisify = fn => (...args) => new Promise((res, rej) => {
  args.push((err, result) => (err ? rej(err) : res(result)));
  fn(...args);
});

const buildHook = (definition, config) =>
  promisify(definition.bind(null, config));

function run(config, defined_hooks, callback) {
  const {
    swagger,
    hooks,
    sway,
    tester
  } = config;

  const flow = {
    onStatusCode: {}
  };

  let specification;

  const ran = Promise.resolve()
    .then(() => {
      if (hooks && hooks.length) {
        hooks.forEach(hook => {
          const { type, onStatusCode } = hook;
          if (!type || !defined_hooks[type] || !onStatusCode) {
            console.error(`Invalid hook config ${type} ${onStatusCode}`);
            return;
          }

          if (flow.onStatusCode[onStatusCode]) {
            flow.onStatusCode[onStatusCode].push(
              buildHook(defined_hooks[type], hook)
            );
          } else {
            flow.onStatusCode[onStatusCode] = [
              buildHook(defined_hooks[type], hook)
            ];
          }
        });
      }
    }).then(() => swayer.fromUrl(swagger, sway))
    .then(spec => { specification = spec; })
    .then(() => Bluebird.map(specification.tests, test => Bluebird.delay(tester
        .delay)
      .then(() => execute(rq, test, tester, flow)), {
        concurrency: tester.concurrency
      }))
    .then(results => {
      delete specification.tests;

      return {
        results,
        specification
      };
    });

  if (typeof callback === 'function') {
    ran.then(data => callback(null, data)).catch(callback);
  }

  return ran;
}

module.exports = {
  run
};
