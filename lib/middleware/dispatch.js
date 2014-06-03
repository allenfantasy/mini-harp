module.exports = function() {
  return function(req, res, next) {
    if (req.url == '/') {
      req.url = "/index.html"
    }
    next();
  }
}
