var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade')
var makeLess = require('./lib/processor/less')
var dispatch = require('./lib/middleware/dispatch')

// create app
var miniHarp = function(root) {
  root = root || process.cwd();
  //return connect().use(serveStatic(root));
  return connect().use(dispatch()).use(makeJade(root)).use(makeLess(root));
};


module.exports = miniHarp;
