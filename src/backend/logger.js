var moment = require('moment');

module.exports = myLog

function myLog() {
	arguments[0] = "[" + moment().format() + "] " + arguments[0];
	console.log.apply(this, arguments);
}

