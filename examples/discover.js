var discover = require('../').discover;

discover(function (err, result) {
  if (err)
    throw err;
  console.log(result);
});
