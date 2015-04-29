var xhr = require('xhr'),
	q = require('q'),
	hl = require('highland');

var jotserver = "http://localhost:8080"
var data = {};

data.authRequest = function (username, password) {
	var defer = q.defer();
	xhr({
		method: 'POST',
		json: {
			user: username,
			password: password
		},
		uri: jotserver + '/authenticate'
	}, function (err, resp, body) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(resp);
	});

	return defer.promise;
}

module.exports = data;
