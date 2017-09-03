var util = require('util');

var request = require('./request');

module.exports = Hue;

function Hue(opts) {
  this.host = opts.host;
  this.user = opts.user;
  this.port = opts.port || 80;
}

// API request convenience wrapper
Hue.prototype.request = function (opts, cb) {
  var _opts = {
    path: opts.endpoint ||
          util.format('/api/%s%s',
              encodeURIComponent(this.user), opts.path),
    hostname: this.host,
    port: this.port,
    method: opts.method,
    data: opts.data ? JSON.stringify(opts.data) : undefined,
    headers: opts.headers || {}
  };

  request(_opts, function (err, body) {
    if (err) {
      cb(err);
      return;
    }

    var data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      cb(e);
      return;
    }

    cb(null, data);
  });
};

// even more convenient GET request wrapper
Hue.prototype.get = function get(opts, cb) {
  if (typeof opts === 'string')
    opts = {path: opts};
  opts.method = 'GET';

  return this.request(opts, cb);
};

// 1. Lights API

// 1.1. Get all lights
Hue.prototype.getAllLights = getAllLights;
Hue.prototype.lights = getAllLights;
function getAllLights(cb) {
  return this.get('/lights', cb);
}

// 1.2. Get new lights
Hue.prototype.newLights = newLights;
function newLights(cb) {
  return this.get('/lights/new', cb);
}

// 1.3. Search for new lights
Hue.prototype.searchForLights = searchForLights;
function searchForLights(cb) {
  return this.request({
    path: '/lights',
    method: 'POST'
  }, cb);
}

// 1.4. Get light attributes and state
Hue.prototype.getLight = getLight;
Hue.prototype.light = getLight;
function getLight(id, cb) {
  var endpoint = util.format('/lights/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 1.5. Set light attributes (rename)
Hue.prototype.setLightAttributes = setLightAttributes;
Hue.prototype.renameLight = setLightAttributes;
function setLightAttributes(id, data, cb) {
  var endpoint = util.format('/lights/%s', encodeURIComponent(id));
  if (typeof data === 'string')
    data = {name: data};

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 1.6. Set light state
Hue.prototype.setLightState = setLightState;
function setLightState(id, data, cb) {
  var endpoint = util.format('/lights/%s/state', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 1.7. Delete lights
Hue.prototype.deleteLight = deleteLight;
function deleteLight(id, cb) {
  var endpoint = util.format('/lights/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 2. Groups API

// 2.1. Get all groups
Hue.prototype.getAllGroups = getAllGroups;
Hue.prototype.groups = getAllGroups;
function getAllGroups(cb) {
  return this.get('/groups', cb);
}

// 2.2. Create group
Hue.prototype.createGroup = createGroup;
function createGroup(data, cb) {
  var endpoint = '/groups';

  return this.request({
    path: endpoint,
    method: 'POST',
    data: data
  }, cb);
}

// 2.3. Get group attributes
Hue.prototype.getGroupAttributes = getGroupAttributes;
Hue.prototype.group = getGroupAttributes;
function getGroupAttributes(id, cb) {
  var endpoint = util.format('/groups/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 2.4. Set group attributes
Hue.prototype.setGroupAttributes = setGroupAttributes;
Hue.prototype.modifyGroup = setGroupAttributes;
function setGroupAttributes(id, data, cb) {
  var endpoint = util.format('/groups/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 2.5. Set group state
Hue.prototype.setGroupState = setGroupState;
function setGroupState(id, data, cb) {
  var endpoint = util.format('/groups/%s/action', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 2.6. Delete group
Hue.prototype.deleteGroup = deleteGroup;
function deleteGroup(id, cb) {
  var endpoint = util.format('/groups/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 3. Schedules API

// 3.1. Get all schedules
Hue.prototype.getAllSchedules = getAllSchedules;
Hue.prototype.schedules = getAllSchedules;
function getAllSchedules(cb) {
  return this.get('/schedules', cb);
}

// 3.2. Create schedule
Hue.prototype.createSchedule = createSchedule;
function createSchedule(data, cb) {
  return this.request({
    path: '/schedules',
    method: 'POST',
    data: data
  }, cb);
}

// 3.3. Get schedule attributes
Hue.prototype.getScheduleAttributes = getScheduleAttributes;
Hue.prototype.schedule = getScheduleAttributes;
function getScheduleAttributes(id, cb) {
  var endpoint = util.format('/schedules/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 3.4. Set schedule attributes
Hue.prototype.setScheduleAttributes = setScheduleAttributes;
Hue.prototype.modifySchedule = setScheduleAttributes;
function setScheduleAttributes(id, data, cb) {
  var endpoint = util.format('/schedules/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 3.5. Delete schedule
Hue.prototype.deleteSchedule = deleteSchedule;
function deleteSchedule(id, cb) {
  var endpoint = util.format('/schedules/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 4. Scenes API

// 4.1. Get all scenes
Hue.prototype.getAllScenes = getAllScenes;
Hue.prototype.scenes = getAllScenes;
function getAllScenes(cb) {
  return this.get('/scenes', cb);
}

// 4.2. Create Scene
Hue.prototype.createScene = createScene;
function createScene(id, data, cb) {
  var endpoint = util.format('/scenes/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 4.3. Modify Scene
Hue.prototype.modifyScene = modifyScene;
function modifyScene(id, light, data, cb) {
  var endpoint = util.format('/scenes/%s/lights/%s/state',
      encodeURIComponent(id),
      encodeURIComponent(light));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 4.4. Recall a scene
// To recall an existing scene you use the Groups API. Check out the Groups API
// set group state for details.

// 4.5. Delete scene
Hue.prototype.deleteScene = deleteScene;
function deleteScene(id, cb) {
  var endpoint = util.format('/scenes/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 4.6 Get Scene
Hue.prototype.getScene = getScene;
Hue.prototype.scene = getScene;
function getScene(id, cb) {
  var endpoint = util.format('/scenes/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 5. Sensors API

// 5.1. Get all sensors
Hue.prototype.getAllSensors = getAllSensors;
Hue.prototype.sensors = getAllSensors;
function getAllSensors(cb) {
  return this.get('/sensors', cb);
}

// 5.2. Create sensor
Hue.prototype.createSensor = createSensor;
function createSensor(data, cb) {
  return this.request({
    path: '/sensors',
    method: 'POST',
    data: data
  }, cb);
}

// 5.3. Find new sensors
Hue.prototype.findNewSensors = findNewSensors;
function findNewSensors(cb) {
  return this.request({
    path: '/sensors',
    method: 'POST'
  }, cb);
}

// 5.4. Get new sensors
Hue.prototype.newSensors = newSensors;
function newSensors(cb) {
  return this.get('/sensors/new', cb);
}

// 5.5. Get sensor
Hue.prototype.getSensor = getSensor;
Hue.prototype.sensor = getSensor;
function getSensor(id, cb) {
  var endpoint = util.format('/sensors/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 5.6. Update Sensor
Hue.prototype.updateSensor = updateSensor;
Hue.prototype.renameSensor = updateSensor;
function updateSensor(id, data, cb) {
  var endpoint = util.format('/sensors/%s', encodeURIComponent(id));
  if (typeof data === 'string')
    data = {name: data};

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 5.7. Delete Sensor
Hue.prototype.deleteSensor = deleteSensor;
function deleteSensor(id, cb) {
  var endpoint = util.format('/sensors/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 5.8. Change Sensor Config
Hue.prototype.changeSensorConfig = changeSensorConfig;
function changeSensorConfig(id, data, cb) {
  var endpoint = util.format('/sensors/%s/config', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 5.9. Change Sensor State
Hue.prototype.changeSensorState = changeSensorState;
function changeSensorState(id, data, cb) {
  var endpoint = util.format('/sensors/%s/state', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'PUT',
    data: data
  }, cb);
}

// 6. Rules API

// 6.1. Get all rules
Hue.prototype.getAllRules = getAllRules;
Hue.prototype.rules = getAllRules;
function getAllRules(cb) {
  return this.get('/rules', cb);
}

// 6.2. Get Rule
Hue.prototype.getRule = getRule;
Hue.prototype.rule = getRule;
function getRule(id, cb) {
  var endpoint = util.format('/rules/%s', encodeURIComponent(id));
  return this.get(endpoint, cb);
}

// 6.3. Create Rule
Hue.prototype.createRule = createRule;
function createRule(data, cb) {
  return this.request({
    path: '/rules',
    method: 'POST',
    data: data
  }, cb);
}

// 6.4. Update Rule
Hue.prototype.updateRule = updateRule;
Hue.prototype.modifyRule = updateRule;
function updateRule(id, data, cb) {
  var endpoint = util.format('/rules/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'POST',
    data: data
  }, cb);
}

// 6.5. Delete Rule
Hue.prototype.deleteRule = deleteRule;
function deleteRule(id, cb) {
  var endpoint = util.format('/rules/%s', encodeURIComponent(id));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 7. Configuration API

// 7.1. Create user
Hue.prototype.createUser = createUser;
function createUser(data, cb) {
  if (typeof data === 'string')
    data = {devicetype: data};

  return this.request({
    endpoint: '/api',
    method: 'POST',
    data: data
  }, cb);
}

// 7.2 Get configuration
Hue.prototype.getConfig = getConfig;
Hue.prototype.config = getConfig;
function getConfig(cb) {
  return this.get('/config', cb);
}

// 7.3. Modify configuration
Hue.prototype.modifyConfig = modifyConfig;
function modifyConfig(data, cb) {
  return this.request({
    path: '/config',
    method: 'PUT',
    data: data
  }, cb);
}

// 7.4. Delete user from whitelist
Hue.prototype.deleteUser = deleteUser;
function deleteUser(user, cb) {
  var endpoint = util.format('/config/whitelist/%s',
      encodeURIComponent(user));

  return this.request({
    path: endpoint,
    method: 'DELETE'
  }, cb);
}

// 7.5. Get full state (datastore)
Hue.prototype.fullState = fullState;
function fullState(cb) {
  return this.get('/', cb);
}

// 8. Info API

// 8.1 Get all Timezones
Hue.prototype.getAllTimezones = getAllTimezones;
Hue.prototype.timezones = getAllTimezones;
function getAllTimezones(cb) {
  return this.get('/info/timezones', cb);
}
