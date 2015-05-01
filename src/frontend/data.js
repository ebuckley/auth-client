var xhr = require('xhr'),
	q = require('q'),
	_ = require('lodash'),
	EventEmitter = require('eventemitter2').EventEmitter2,
	hub = new EventEmitter({
		wildcard: true,
		delimiter: '#',
		newListener: true
	}),
	hl = require('highland');

var jotserver = "/jotservice"
var jotTokenKey = "jotAuthToken";

//module we are exporting
var data = {};

var logUserIn = function (token, username) {
	var data = _.extend(token, {
		username: username
	});
	localStorage.setItem(jotTokenKey, JSON.stringify(data));
	hub.emit('login', data);

};

console.log('init data model...');

window.addEventListener('storage', function(e) {
	console.log('storage eventhandler', e);
	if (e.key === jotTokenKey) {
		if (!e.oldValue) hub.emit('login', JSON.parse(e.newValue));
		if (!e.newValue) hub.emit('logout');
	}
}, false);

data.hub = hub;

hub.on('login', function () {
	data.getUserData();
});

/**
 * Return token if logged in else returns falsy
 */
data.isLoggedIn = function () {
	var token = localStorage.getItem(jotTokenKey);
	if (token) {
		return JSON.parse(token);
	}
	return false;
};

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
		if (resp.statusCode == 200) {
			logUserIn(resp.body, username);
			defer.resolve(resp.body);
		} else {
			defer.reject(resp.body);
		}
	});

	return defer.promise;
};

data.logout = function  () {
	localStorage.removeItem(jotTokenKey)
	hub.emit('logout');
};

data.register = function  (username, password) {
	var defer = q.defer();

	xhr({
		method: 'POST',
		json: {
			user: username,
			password: password
		},
		uri: jotserver + '/register'
	}, function (err, resp) {
		if (err) {
			defer.reject(err);
		}
		console.log(resp);
		if (resp.statusCode === 409) {
			//http statusCode for conflict
			defer.reject("User already exists");
		} else if(resp.statusCode === 201) {
			logUserIn(resp.body, username);
			defer.resolve(resp.body);
		} else {
			defer.reject(`Error ${resp.statusCode}: ${resp.body}`);
		}

	});

	return defer.promise;
};

data.getUserData = function () {
	var defer = q.defer();
	var token = data.isLoggedIn();
	if (token) {
		xhr({
			method: 'GET',
			uri: jotserver + '/profile',
			headers: {
				token
			}
		}, function  (err, res) {
			if (err) {
				defer.reject("fatal error" + err.toString());
			}
			hub.emit('getUserData', JSON.parse(res.body));
			defer.resolve(res);
		});
	} else {
		defer.reject('Not logged in');
	}
	return defer.promise;
};


module.exports = data;
