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
    key = new Date();

  db.put(prefix+'~'+key.valueOf(), data, function(err){
    if( callback )
      return callback(err, {ok:true});
	});

};

exports.get = function(prefix, key, callback){

  if( prefix == null )
    prefix = "unknown-test"

  if( key == null )
    key = new Date();

    if( callback )
      return callback(null, {});
};
