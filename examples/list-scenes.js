var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.scenes(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));
});
