const cheerio = require('cheerio');
const url = require('url');
const request = require('request');

var tokenCache = {};

function parseCSRFToken(body, { selector, input_name }, callback) {
  try {
    const token_input = cheerio.load(body)(selector)
      .serializeArray()
      .find(({ name }) => name === input_name);

    if (!token_input || !token_input.value) {
      return callback(new Error('failed to find csrf token'));
    }

    callback(null, token_input.value);
  } catch (err) {
    callback(err);
  }
}

function parseQueryToken(req, auth_query_param, callback) {
  try {
    const location = url.parse(req.headers['location'], true);
    // let token = .query[auth_query_param];
    let token = location.query[auth_query_param];

    if (!token && location.hash && location.hash.length) {
      token = location.hash.match(new RegExp(`${auth_query_param}=(\\w+)`))[1];
    }

    if (!token || !token.length) {
      return callback(new Error('failed to find token'));
    }

    callback(null, token);
  } catch (err) {
    callback(err);
  }
}

function authorization(rq, { uri, qs }, csrf, callback) {

  rq({ uri, qs }, onLogin);

  function onLogin(err, res, body) {
    if (err) return callback(err);

    if (csrf) {
      return parseCSRFToken(body, csrf, (err, csrfToken) => {
        if (err) return callback(err);
        callback(null, {
          csrfToken
        });
      });
    }

    callback(null, {});
  }
}

function requestLogin(rq, {
  uri,
  qs,
  type,
  form,
  csrf,
  cookies,
  auth_query_param
}, callback) {
  if (!form) {
    return callback(new Error('missing form'));
  }

  let formData = form;

  if (csrf && csrf.token) {
    formData = Object.assign({}, form, {
      [csrf.input_name]: csrf.token
    });
  }

  rq({
    uri,
    qs,
    method: 'POST',
    form: formData
  }, (err, res) => {
    if (err) return callback(err);
    parseQueryToken(res, auth_query_param, callback);
  });
}

const buildResponse = ({ token, auth_prefix }) => ({
  headers: {
    authorization: `${auth_prefix}${token}`
  }
});

const clint_side_oauth = ({ login, authorize, csrf, cache }, { flushcache }, callback) => {
  const { auth_prefix = 'Bearer ' } = login;

  if (cache && cache.id && !flushcache) {
    const cached = tokenCache[cache.id];
    if (cached) {
      cached
        .then(token => buildResponse({
          token,
          auth_prefix
        })).then(res => callback(null, res))
        .catch(callback);
      return;
    }
  }

  const rq = request.defaults({
    jar: request.jar(),
    followRedirect: false,
    method: 'GET'
  });

  const promiseToken = new Promise((resolve, reject) => {

    authorization(rq, authorize, csrf, onAuthorization);

    function onAuthorization(err, { csrfToken } = {}) {
      if (err) return reject(err);

      const fullCSRF = Object.assign({}, csrf, {
        token: csrfToken
      });
      requestLogin(rq, Object.assign({}, login, {
        csrf: fullCSRF
      }), onLogin);
    }

    function onLogin(err, token) {
      if (err) return reject(err);
      resolve(token);
    }
  });

  if (cache && cache.id) {
    tokenCache[cache.id] = promiseToken;

    promiseToken.catch(() => {
      delete tokenCache[cache.id];
    });
  }

  promiseToken.then(token => {
    callback(null, buildResponse({ token, auth_prefix }));
  }).catch(callback);

};


module.exports = clint_side_oauth;
