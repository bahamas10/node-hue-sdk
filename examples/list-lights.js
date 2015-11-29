var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.lights(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));

  var first = Object.keys(result)[0];

  console.log();
  if (first) {
    client.light(first, function (err, light) {
      if (err)
        throw err;

      console.log(JSON.stringify(light, null, 2));
    });
  } else {
    console.log('no lights found');
  }
});
