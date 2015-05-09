var React = require('react'),
	Login = require('./login'),
	data = require('./data'),
	Register = require('./login/register');


var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;

var template = React.createClass({
	render: function() {
		return (
			<Locations>
				<Location path="/" handler={Login} />
				<Location path="/register" handler={Register} />
			</Locations>
		);
	}

});

module.exports = template;