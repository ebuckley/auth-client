var express = require('express'),
	request = require('request'),
	log = require('./logger'),
	cfg = require('./config'),
	util = require('./util'),
	router = express.Router();

//public
function AuthenticatedMiddleware(req, res, next) {

	var token = req.body.Token || req.header("Token");

	if (!token) {
		next(new Error("token missing or invalid"));
		return;
	}

	var proxyTo = cfg.jotserverLocation + '/restricted'
	request({
		uri: proxyTo,
		method: "POST",
		body: {
			Token: token
		},
		json: true
	}, function (err, response, body) {
		if (err) {
			log('ERROR: fatal error authserver backend is down:', err);
			res.status(500).end();
			return;
		}
		//if status not valid return unauthorized response
		if (response.statusCode === 500) {
			log('jotserver Error', body);
			res.status(500);
			res.send(body);
			res.end();
			return;
		}

		if (response.statusCode === 200) {
			log("user validated", body, response.statusCode);
			next();
		} else {
			res.status(401);
			res.send(body);
			res.end();
			return;
		}

	});
}

router.get('/profile', AuthenticatedMiddleware ,function (req, res) {
	res.send({
		Msg: "Muh secrets!"
	});
});

router.post('/authenticate', function  (req, res) {

	var proxyTo = cfg.jotserverLocation + '/authenticate';

	request({
		uri: proxyTo,
		method: "POST",
		body: req.body,
		json: true
	}, util.serviceResponseHandler(req, res));

});

router.post('/register', function  (req, res) {
	var proxyTo = cfg.jotserverLocation + '/register';
	request({
		uri: proxyTo,
		method: "POST",
		body: req.body,
		json: true
	}, util.serviceResponseHandler(req, res));
});

module.exports = {}
module.exports.router = router;
module.exports.AuthenticatedMiddleware = AuthenticatedMiddleware;
