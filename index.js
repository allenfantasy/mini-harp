var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade')

// create app
var miniHarp = function(root) {
  root = root || process.cwd();
  //return connect().use(serveStatic(root));
  return connect().use(makeJade(root));
};


module.exports = miniHarp;
