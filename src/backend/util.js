module.exports = {};
module.exports.serviceResponseHandler = function (req, res) {
	return function (err, response, body) {
		if (err) {
			log('ERROR: fatal error backend is down:', err);
			res.status(500).end();
			return;
		}
		res.status(response.statusCode)
		res.send(body);
	};
};
