require('express')().use('/', require('express').static('static')).listen(8700,
  err => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }
    require('../lib/swayer')
      .fromUrl('http://localhost:8700/swagger.json', {},
        (err, data) => {
          if (err) {
            console.error(err);
            return process.exit(1);
          }
          console.log(JSON.stringify(data, null, 2));
          process.exit();
        });
  });
