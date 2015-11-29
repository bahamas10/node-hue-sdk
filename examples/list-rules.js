var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.rules(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));

  var first = Object.keys(result)[0];

  console.log();
  if (first) {
    client.rule(first, function (err, rule) {
      if (err)
        throw err;

      console.log(JSON.stringify(rule, null, 2));
    });
  } else {
    console.log('no rules found');
  }
});
