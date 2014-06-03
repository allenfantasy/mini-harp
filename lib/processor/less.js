module.exports = makeLess;

var fs = require('fs');
var path = require('path');
var less = require('less');

function makeLess(root) {
  return function(req, res, next) {
    var extname = path.extname(req.url)
      , basename, lessFile, cssFile, css;
    if (extname == '.css') {
      cssFile = root + req.url;
      // check css file existence
      fs.exists(cssFile, function(exists) {
        if (exists) {
          fs.readFile(cssFile, { encoding: 'utf-8' }, function (err, data){
            if (err) throw err;
            res.end(data);
          })
        }
        else {
          basename = path.basename(root + req.url, extname)
          lessFile = root + '/' + basename + '.less';
          // check less file existence
          fs.exists(lessFile, function(exists) {
            if (exists) {
              fs.readFile(lessFile, { encoding: 'utf-8' }, function(err, data) {
                if (err) throw err; // why throw?
                less.render(data, function(e, css){
                  res.write(css);
                  res.end();
                });
              })
            }
            else {
              next();
            }
          })
        }
      });
    }
    else {
      next();
    }
  }
}
