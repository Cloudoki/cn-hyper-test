// levelDB version
"use strict"

const level = require('levelup' ),
      db    = level(__dirname+'/../db', { valueEncoding:'json' });
/**
* prefix: the table name (test project id)
* key:
*/
exports.put = function(key, data, callback){

  if( key == null )
    key = new Date().valueOf();

  db.put(key, data, function(err){
    if( callback )
      return callback(err, {ok:true});
	});

};

exports.get = db.get.bind(db);    

exports.next = function(component, callback){

  var filter = {};
  var result;
  var error;

  filter.start = component;
  filter.keys = true;
  filter.values = true;
  filter.limit = 1;
  var counter = 0;

  var rstream = db.createReadStream(filter)
  .on('data', function(data){
    result = data.value;
  })
  .on('error', function(err){
    log.error("[Dumper] err:", err);
    error = err;
  })
  .on('end', function(){

    return callback(error, result);
  });
};
