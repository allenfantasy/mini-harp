module.exports = makeJade;

var fs = require('fs');
var path = require('path');
var jade = require('jade');
function renderFile(filename, options, fallback) {
  var html, res = options.response;
  fs.exists(filename, function(exists) {
    if (exists) {
      fs.readFile(filename, { encoding: 'utf-8' }, function(err, data) {
        if (err) throw err;
        if (options.jade) {
          html = jade.render(data);
          res.end(html);
        }
        else {
          // html
          res.write(data);
          res.end();
        }
      })
    }
    else {
      fallback();
    }
  })
}

function makeJade(root) {
  return function(req, res, next) {
    var extname = path.extname(req.url)
      , basename, jadeFile, htmlFile, html;
    if (extname == '.html') {
      htmlFile = root + req.url;
      console.log(htmlFile);
      renderFile(htmlFile, { response: res }, function() {
        basename = path.basename(root + req.url, extname)
        jadeFile = root + '/' + basename + '.jade';
        renderFile(jadeFile, { jade: true, response: res }, next);
      });
    }
    else {
      next();
    }
  };
}
