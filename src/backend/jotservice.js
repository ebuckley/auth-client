var express = require('express'),
	request = require('request'),
	log = require('./logger'),
	cfg = require('./config'),
	router = express.Router();

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
			log('ERROR: fatal error backend is down:', err);
			res.status(500).end();
			return;
		}
		log("user validated");
		next();
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
	}, function (err, response, body) {
		if (err) {
			log('ERROR: fatal error backend is down:', err);
			res.status(500).end();
		}
		res.status(response.statusCode)
		res.send(body);
	});

});

router.post('/register', function  (req, res) {
	var proxyTo = cfg.jotserverLocation + '/register';

	request({
		uri: proxyTo,
		method: "POST",
		body: req.body,
		json: true
	}, function (err, response, body) {
		if (err) {
			log('ERROR: fatal error backend is down:', err);
			res.status(500).end();
		}
		res.status(response.statusCode)
		res.send(body);
	});

});

module.exports = {}
module.exports.router = router;