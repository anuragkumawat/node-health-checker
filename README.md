# node-status-health


#### node-status-helath npm module used to print overall os status memory status as well as current process details.


## Installation

```bash
npm i node-status-health --save
```

## Usage

In your node program:

```js
var NODE_STATUS_HEALTH = require('node-status-health')
```

## Calling

Calling of status function

```js
	NODE_STATUS_HEALTH.status().then(function(result) {
		response.send(result);
	}).catch(function(error) {
		response.send({});
	});
```

Calling of health function

```js
	NODE_STATUS_HEALTH.health().then(function(result) {
		response.send(result);
	}).catch(function(error) {
		response.send({});
	});
```

