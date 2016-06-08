const handlebars = require('handlebars');

var app = require('express')(),
bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/render', function(req, res) {
  const source = require('fs').readFileSync(require('path').join(__dirname, '../views/mail.hbs'), 'utf8');
  const template = handlebars.compile(source);
  const context = require('../views/context_example.json');
  res.end(template(context));
});

app.listen(8800, function() {
  console.log('Hyper test listening on port', 8800);
});
