const request = require('request');
const swayer = require('./swayer');

const rq = request.defaults({
  followRedirect: false,
  json: true,
  headers: {
    'Cache-Control': 'no-cache'
  },
  method: 'GET',
  time: true
});

function run(config, defined_hooks, callback) {
  const { swagger, hooks, sway } = config;
  const flow = {
    onStatusCode: {}
  };

  const ran = Promise.resolve().then(() => {
    if (hooks && hooks.length) {
      hooks.forEach(hook => {
        const { type, onStatusCode } = hook;
        if (!type || !defined_hooks[type] || !onStatusCode) {
          console.error(`Invalid hook config ${type} ${onStatusCode}`);
          return;
        }
        if (flow.onStatusCode[onStatusCode]) {
          flow.onStatusCode[onStatusCode].push(hook);
        } else {
          flow.onStatusCode[onStatusCode] = [hook];
        }
      });
    }
  }).then(() => swayer.fromUrl(swagger, sway))
    .then(spec => {
      const tests = spec.paths.reduce(t, p => {
        t.concat()
        p.operations.(op => {
          if (op.method === 'GET') return null;
        });
      });
    });


  if (typeof callback === 'function') {
    ran.then(data => callback(null, data)).catch(callback);
  }

  return ran;
}

module.exports = {
  run
};
