var Hue = require('../').Hue;
var client = new Hue(require('./config'));

var light = process.argv[2];
var temp = +process.argv[3] || 2700;
var bri = +process.argv[4] || 255;

var state = {
  on: true,
  ct: Math.round(1e6 / temp),
  bri: bri
};
client.setLightState(light, state, function (err, result) {
  if (err)
    throw err;
  console.log(JSON.stringify(result, null, 2));
});
