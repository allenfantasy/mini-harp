var connect = require('connect');
var serveStatic = require('serve-static');

// create app
var miniHarp = function(root) {
  root = root || process.cwd();
  return connect().use(serveStatic(root));
};


module.exports = miniHarp;
