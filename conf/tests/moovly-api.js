module.exports = {
  name: 'Moovly',
  component: 'Moovly API',
  version: 'production',
  server: 'https://api.moovly.com',
  swagger: 'http://localhost:8700/swagger.json',
  repos: [
    'https://github.com/Moovly/moovly-api',
    'https://github.com/Moovly/moovly-worker'
  ],
  branchs: [
    'master'
  ],
  recipients: [
    // 'ricardo@cloudoki.com',
    // 'catia@cloudoki.com',
    // 'nuno@cloudoki.com',
    // 'koen@cloudoki.com',
    // 'development@moovly.com',
    'edgar@cloudoki.com'
  ],
  tester: {
    attempts: 2,
    concurrency: 3,
    delayAttempt: 50,
    delay: 20
  },
  sway: {},
  hooks: [{
    type: 'client-side-oauth',
    onStatusCode: 403,
    cache: {
      id: 'moovly-api'
    },
    authorize: {
      uri: 'https://api.moovly.com/oauth2/authorize',
      qs: {
        response_type: 'token',
        state: 'xyz',
        client_id: 'oauth25458aecb29c9d8.21352539',
        redirect_uri: 'https://www.moovly.com/platform/auth.html',
        token: 'https://www.moovly.com/platform/login.html'
      }
    },
    login: {
      uri: 'https://api.moovly.com/oauth2/login',
      qs: {
        redirect_uri: 'https://www.moovly.com/platform/auth.html'
      },
      form: {
        'form[email]': 'edgar@cloudoki.com',
        'form[password]': 'secretstory',
        'form[login]': ''
      },
      auth_query_param: 'token',
      auth_prefix: ''
    },
    csrf: {
      selector: 'form',
      input_name: 'form[_token]'
    }
  }]
};
