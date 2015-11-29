var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.config(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));
});
