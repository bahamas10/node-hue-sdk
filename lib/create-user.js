var assert = require('assert');

var request = require('./request');

module.exports = createUser;

function createUser(host, data, cb) {
  if (typeof data === 'string')
    data = {devicetype: data};

  // request will be made 10 times with a 3 second delay in between
  var i = 10;
  function go() {
    request({
      path: '/api',
      method: 'POST',
      hostname: host,
      data: JSON.stringify(data)
    }, function (err, body) {
      if (err) {
        cb(err);
        return;
      }

      var result;
      try {
        result = JSON.parse(body);
      } catch (e) {
        cb(e);
        return;
      }

      try {
        assert(result[0].error.type === 101);
      } catch (e) {
        cb(null, result);
        return;
      }

      // must retry
      if (--i > 0) {
        setTimeout(go, 3 * 1000);
        return;
      }

      // max retries hit, error
      cb(new Error('failed to register'));
    });
  }

  go();
}
