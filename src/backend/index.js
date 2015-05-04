var express = require('express'),
	bodyparser = require('body-parser'),
	jotservice = require('./jotservice'),
	log = require('./logger'),
	_ = require('lodash'),
	path = require('path');

var cfg = require('./config');


var app = express();

app.use(bodyparser.json());

app.use(function (req, res, next) {

	var startTs = Date.now();

	req.on('end', function () {
		log('Request Response: from: %s for: %s time:%s ms', req.ip , req.originalUrl, Date.now() - startTs);
	});

	log('Request: from: %s for: %s',  req.ip, req.originalUrl);
	next();
});

app.use('/static', express.static(cfg.staticFilesLocation));

app.use('/jotservice', jotservice.router);
app.get('/', function (req, res) {
	res.sendFile(path.join(cfg.staticFilesLocation, 'index.html'), function (err) {
		if (err) {
			log(err);
			res.status(err.status).end();
		}
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port
	log('Finance backend started at http://%s:%s', host, port);
	log('config', cfg);
});