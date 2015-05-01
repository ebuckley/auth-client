var React = require('react'),
	Login = require('./login'),
	Profile = require('./profile'),
	data = require('./data'),
	Register = require('./login/register');


var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;

var template = React.createClass({

	componentWillMount: function() {
		data.hub.on('nav#Login', e => this.setState({
			active: ( <Login/> )
		}));
		data.hub.on('nav#Home', e => this.setState({
			active: ( <Profile/> )
		}));
	},
	getInitialState: function() {
		return {
			active: ""
		};
	},
	render: function() {
		var profile =  <Profile/>;
		var login = <Login/>;
		console.log(this.state.active);
		return (
			<Locations>
				<Location path="/" handler={Profile} />
				<Location path="/login" handler={Login} />
				<Location path="/register" handler={Register} />
			</Locations>
		);
	}

});

module.exports = template;