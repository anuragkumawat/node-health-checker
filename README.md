# node-health-checker


#### node-health-checker npm module used to print overall os status memory status as well as current process details.


## Installation

```bash
npm i node-health-checker --save
```

## Usage

In your node program:

```js
var NODE_HEALTH_CHECKER = require('node-health-checker')
```

## Calling

Calling of status function

```js
	NODE_HEALTH_CHECKER.status().then(function(result) {
		response.send(result);
	}).catch(function(error) {
		response.send({});
	});
```

Calling of health function

```js
	NODE_HEALTH_CHECKER.health().then(function(result) {
		response.send(result);
	}).catch(function(error) {
		response.send({});
	});
```

