var Hue = require('../').Hue;
var client = new Hue(require('./config'));

client.schedules(function (err, result) {
  if (err)
    throw err;

  console.log(JSON.stringify(result, null, 2));

  var first = Object.keys(result)[0];

  console.log();
  if (first) {
    client.schedule(first, function (err, schedule) {
      if (err)
        throw err;

      console.log(JSON.stringify(schedule, null, 2));
    });
  } else {
    console.log('no schedules found');
  }
});
