var http = require('http');

module.exports = request;

// simple HTTP request
function request(opts, cb) {
  var req = http.request(opts, function (res) {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      var e = new Error('bad statusCode ' + res.statusCode);
      e.statusCode = e.code = res.statusCode;
      cb(e);
      return;
    }

    res.setEncoding('utf8');

    var body = '';

    res.on('data', function (data) {
      body += data;
    });

    res.on('end', function () {
      cb(null, body);
    });
  });

  req.on('error', function (e) {
    cb(e);
  });

  req.end(opts.data);

  if (opts.timeout) {
    req.setTimeout(opts.timeout);
    req.on('timeout', function () {
      req.abort();
    });
  }

  return req;
}
