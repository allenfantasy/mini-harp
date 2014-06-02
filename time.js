var connect = require("connect")
//var morgan = require("morgan")

var app = connect();

app.use(function(req, res, next) {
  //console.log(req.url)
  if (req.url == "/current-time") {
    var dateStr = (new Date()).toISOString();
    res.end(dateStr)
  }
  else {
    next();
  }
}).listen(4000)
