var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.sensors(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));

  var first = Object.keys(result)[0];

  console.log();
  if (first) {
    client.sensor(first, function (err, sensor) {
      if (err)
        throw err;

      console.log(JSON.stringify(sensor, null, 2));
    });
  } else {
    console.log('no sensors found');
  }
});
