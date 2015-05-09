var express = require('express'),
	request = require('request'),
	log = require('./logger'),
	cfg = require('./config'),
	util = require('./util'),
	Authed = require('./jotservice').AuthenticatedMiddleware,
	url = require('url'),
	router = express.Router();

var profileEndpoint = cfg.dataServiceLocation + '/series';

router.get('/profile', Authed ,function (req, res) {

	request({
		uri: profileEndpoint,
		method: "GET",
	},util.serviceResponseHandler(req, res));
});

router.post('/profile', Authed, function (req, res) {
});


module.exports = {}
module.exports.router = router;