var createUser = require('../').createUser;

console.log('press link button');
createUser('hue-bridge', 'my-app#my-name', function (err, result) {
  if (err)
    throw err;
  console.log(result);
});
