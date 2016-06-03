// levelDB version
"use strict"

const level = require('levelup' ),
      db    = level(__dirname+'/../db', { valueEncoding:'json' });
/**
* prefix: the table name (test project id)
* key:
*/
exports.put = function(prefix, key, data, callback){

  if( prefix == null )
    prefix = "unknown"

  if( key == null )
    key = new Date().valueOf();

  db.put(prefix+'~'+key, data, function(err){
    if( callback )
      return callback(err, {ok:true});
	});

};

exports.get = function(prefix, key, callback){

  if( prefix == null )
    prefix = "unknown"

  if( key == null )
    key = new Date();

    if( callback )
      return callback(null, {});
};


exports.next = function(component, callback){

  var filter = {};
  var result;
  var error;

  filter.start = component+"~"+new Date().valueOf();
  filter.keys = true;
  filter.values = true;
  filter.limit = 2;
  var counter = 0;

  var rstream = db.createReadStream(filter)
  .on('data', function(data){
    if( 0 == counter++ )
      result = data.value;
    else
      self.start = data.key;
  })
  .on('error', function(err){
    log.error("[Dumper] err:", err);
    error = err;
  })
  .on('end', function(){

    return callback(error, result);
  });
};
