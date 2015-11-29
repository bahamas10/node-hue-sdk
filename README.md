Phillips Hue API
================

Phillips Hue API library

This library is intended to be a very thin wrapper around the Hue API.  It maps
1-to-1 to all endpoints listed in
http://www.developers.meethue.com/philips-hue-api

Usage
-----

``` js
var hue = require('hue-sdk');

hue.discover(function (err, result) {
  if (err)
    throw err;
  console.log(result);
  // => ["10.0.1.80"]
});

var client = new hue.Hue({
  host: '10.0.1.80',
  user: 'foobar'
});

client.lights(function (err, result) {
  if (err)
    throw err;

  console.log(result);
  // => array of lights, see
  // http://www.developers.meethue.com/documentation/lights-api#11_get_all_lights
});
```

API
---

### Discovery

`hue.discover([opts], function (err, result) {})`

Discover all Hue bridges on the current network - callsback with an array
of IP addresses for bridges found

- `opts.timeout` timeout in milliseconds, default is 3000

``` js
var discover = require('hue-sdk').discover;

discover(function (err, result) {
  if (err)
    throw err;
  console.log(result);
  // => ['10.0.1.80']
});
```

### Create User

`hue.createUser(host, user, function (err, result) {})`

Register a user on the bridge

``` js
var createUser = require('hue-sdk').createUser;

console.log('press link button');
createUser('hue-bridge', 'my-app#my-name', function (err, result) {
  if (err)
    throw err;
  console.log(result);
  // => [ { success: { username: '2ecf0a841659d5a22427258f3297157f' } } ]
});
```

### 1. Lights API

All methods below this must be called on a `Hue` instance... for example:

``` js
var Hue = require('hue-sdk').Hue;
var client = new hue.Hue({
  host: '10.0.1.80',
  user: '2ecf0a841659d5a22427258f3297157f'
});
```

Where `user` is taken from the response in `hue.createUser` above

All methods that take a callback expect this signature

- `function (err, result)`

Where `err` is a possible error, and `result` is the JSON parsed
response directly from the Hue API

Some methods have aliases for easier usage, for example `client.getAllLights`
is aliased to `client.lights`

#### 1.1. Get all lights

http://www.developers.meethue.com/documentation/lights-api#11_get_all_lights

- `client.getAllLights(cb)`
- `client.lights(cb)`

#### 1.2. Get new lights

http://www.developers.meethue.com/documentation/lights-api#12_get_new_lights

- `client.newLights(cb)`

#### 1.3. Search for new lights

http://www.developers.meethue.com/documentation/lights-api#13_search_for_new_lights

- `client.searchForLights(cb)`

#### 1.4. Get light attributes and state

http://www.developers.meethue.com/documentation/lights-api#14_get_light_attributes_and_state

- `client.getLight(id, cb)`
- `client.light(id, cb)`

#### 1.5. Set light attributes (rename)

http://www.developers.meethue.com/documentation/lights-api#15_set_light_attributes_rename

- `client.setLightAttributes(id, data, cb)`
- `client.renameLight(id, data, cb)`

#### 1.6. Set light state

http://www.developers.meethue.com/documentation/lights-api#16_set_light_state

- `client.setLightState(id, data, cb)`

#### 1.7. Delete lights

http://www.developers.meethue.com/documentation/lights-api#17_delete_lights

- `client.deleteLight(id, cb)`

### 2. Groups API

#### 2.1. Get all groups

http://www.developers.meethue.com/documentation/groups-api#21_get_all_groups

- `client.getAllGroups`
- `client.groups`

#### 2.2. Create group

http://www.developers.meethue.com/documentation/groups-api#22_create_group

- `client.createGroup`

#### 2.3. Get group attributes

http://www.developers.meethue.com/documentation/groups-api#23_get_group_attributes

- `client.getGroupAttributes`
- `client.group`

#### 2.4. Set group attributes

http://www.developers.meethue.com/documentation/groups-api#24_set_group_attributes

- `client.setGroupAttributes`
- `client.modifyGroup`

#### 2.5. Set group state

http://www.developers.meethue.com/documentation/groups-api#25_set_group_state

- `client.setGroupState`

#### 2.6. Delete group

http://www.developers.meethue.com/documentation/groups-api#26_delete_group

- `client.deleteGroup`

### 3. Schedules API

#### 3.1. Get all schedules

http://www.developers.meethue.com/documentation/schedules-api-0#31_get_all_schedules

- `client.getAllSchedules`
- `client.schedules`

#### 3.2. Create schedule

http://www.developers.meethue.com/documentation/schedules-api-0#32_create_schedule

- `client.createSchedule`

#### 3.3. Get schedule attributes

http://www.developers.meethue.com/documentation/schedules-api-0#33_get_schedule_attributes

- `client.getScheduleAttributes`
- `client.schedule`

#### 3.4. Set schedule attributes

http://www.developers.meethue.com/documentation/schedules-api-0#34_set_schedule_attributes

- `client.setScheduleAttributes`
- `client.modifySchedule`

#### 3.5. Delete schedule

http://www.developers.meethue.com/documentation/schedules-api-0#35_delete_schedule

- `client.deleteSchedule`

### 4. Scenes API

#### 4.1. Get all scenes

http://www.developers.meethue.com/documentation/scenes-api#41_get_all_scenes

- `client.getAllScenes`
- `client.scenes`

#### 4.2. Create Scene

http://www.developers.meethue.com/documentation/scenes-api#42_create_scene

- `client.createScene`

#### 4.3. Modify Scene

http://www.developers.meethue.com/documentation/scenes-api#43_modify_scene

- `client.modifyScene`

#### 4.4. Recall a scene

http://www.developers.meethue.com/documentation/scenes-api#44_recall_scene

> To recall an existing scene you use the Groups API. Check out the Groups API
> set group state for details.

#### 4.5. Delete scene

http://www.developers.meethue.com/documentation/scenes-api#45_delete_scene

> Scenes cannot be deleted from the bridge. When the maximum number of scenes
> has been reached the scene which has been used the least is recycled.

### 5. Sensors API

#### 5.1. Get all sensors

http://www.developers.meethue.com/documentation/sensors-api#51_get_all_sensors

- `client.getAllSensors`
- `client.sensors`

#### 5.2. Create sensor

http://www.developers.meethue.com/documentation/sensors-api#52_create_sensor

- `client.createSensor`

#### 5.3. Find new sensors

http://www.developers.meethue.com/documentation/sensors-api#53_autodiscover_sensors

- `client.findNewSensors`

#### 5.4. Get new sensors

http://www.developers.meethue.com/documentation/sensors-api#54_getnew_sensors

- `client.newSensors`

#### 5.5. Get sensor

http://www.developers.meethue.com/documentation/sensors-api#55_get_sensor

- `client.getSensor`
- `client.sensor`

#### 5.6. Update Sensor

http://www.developers.meethue.com/documentation/sensors-api#56_update_sensor

- `client.updateSensor`
- `client.renameSensor`

#### 5.7. Delete Sensor

http://www.developers.meethue.com/documentation/sensors-api#57_delete_sensor

- `client.deleteSensor`

#### 5.8. Change Sensor Config

http://www.developers.meethue.com/documentation/sensors-api#58_change_sensor_config

- `client.changeSensorConfig`

#### 5.9. Change Sensor State

http://www.developers.meethue.com/documentation/sensors-api#59_change_sensor_state

- `client.changeSensorState`

### 6. Rules API

#### 6.1. Get all rules

http://www.developers.meethue.com/documentation/rules-api#61_get_all_rules

- `client.getAllRules`
- `client.rules`

#### 6.2. Get Rule

http://www.developers.meethue.com/documentation/rules-api#62_get_rule

- `client.getRule`
- `client.rule`

#### 6.3. Create Rule

http://www.developers.meethue.com/documentation/rules-api#63_create_rule

- `client.createRule`

#### 6.4. Update Rule

http://www.developers.meethue.com/documentation/rules-api#64_update_rule

- `client.updateRule`
- `client.modifyRule`

#### 6.5. Delete Rule

http://www.developers.meethue.com/documentation/rules-api#65_delete_rule

- `client.deleteRule`

### 7. Configuration API

#### 7.1. Create user

http://www.developers.meethue.com/documentation/configuration-api#71_create_user

- `client.createUser`

NOTE: `hue.createUser` should be preferred here

#### 7.2 Get configuration

http://www.developers.meethue.com/documentation/configuration-api#72_get_configuration

- `client.getConfig`
- `client.config`

#### 7.3. Modify configuration

http://www.developers.meethue.com/documentation/configuration-api#73_modify_configuration

- `client.modifyConfig`

#### 7.4. Delete user from whitelist

http://www.developers.meethue.com/documentation/configuration-api#74_delete_user_from_whitelist

- `client.deleteUser`

#### 7.5. Get full state (datastore)

http://www.developers.meethue.com/documentation/configuration-api#75_get_full_state_datastore

- `client.fullState`

### 8. Info API

#### 8.1 Get all Timezones

http://www.developers.meethue.com/documentation/info-api#81_get_all_timezones

- `client.getAllTimezones`
- `client.timezones`

### Generic Request

- `client.request(opts, cb)`

- `client.get(path, cb)

License
-------

MIT License
