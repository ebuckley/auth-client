var express = require('express'),
	bodyparser = require('body-parser'),
	jotservice = require('./jotservice'),
	_ = require('lodash'),
	path = require('path');

var cfg = require('./config');


var app = express();

app.use(bodyparser.json());
app.use('/static', express.static(cfg.staticFilesLocation));

app.use('/jotservice', jotservice.router);
app.get('/', function (req, res) {
	res.sendFile(path.join(cfg.staticFilesLocation, 'index.html'), function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port
	console.log('Finance backend started at http://%s:%s', host, port);
	console.log('config', cfg);
});