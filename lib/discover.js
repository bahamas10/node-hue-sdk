// logic lifted from
// https://github.com/bahamas10/hue.js/blob/dave-1432672068/lib/Discoverer.js

var dgram = require('dgram');

var request = require('./request');

var packet = [
  'M-SEARCH * HTTP/1.1',
  'HOST:239.255.255.250:1900',
  'MAN:"ssdp:discover"',
  'ST:ssdp:all',
  'MX:1',
  ''
].join('\r\n');

var multicast = '239.255.255.250';

module.exports = function(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  opts.timeout = opts.timeout || 3000;

  var client = dgram.createSocket('udp4');
  var message = new Buffer(packet);

  client.bind(function () {
    client.addMembership(multicast);

    var found = [];
    client.on('message', function (msg, rinfo) {
      if (found.indexOf(rinfo.address) === -1) {
        found.push(rinfo.address);
      }
    });

    client.send(message, 0, message.length, 1900, multicast);

    setTimeout(function () {
      client.close();

      var bridges = [];
      var i = 0;
      found.forEach(function (server) {
        i++;
        hueFinder(server, opts.timeout, function (isbridge) {
          if (isbridge)
            bridges.push(server);

          if (--i === 0)
            cb(null, bridges);
        });
      });
    }, opts.timeout);
  });
};

function hueFinder(server, timeout, cb) {
  var opts = {
    path: '/description.xml',
    hostname: server,
    method: 'GET',
    timeout: timeout
  };
  request(opts, function(err, body) {
    if (err) {
      cb(false);
      return;
    }
    cb(/Philips hue bridge/g.test(body));
  });
}
