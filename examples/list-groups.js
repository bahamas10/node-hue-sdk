var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.groups(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));

  var first = 0; // group 0 always exists

  console.log();
  client.group(first, function (err, group) {
    if (err)
      throw err;

    console.log(JSON.stringify(group, null, 2));
  });
});
