var React = require('react'),
	data = require('../data');

var Profile = React.createClass({

	componentWillMount: function() {
		data.getUserData()
		.fail( err => 
			this.setState({
				error: err.toString()  
			})
		);

		data.hub.on('getUserData', 	profile =>
			this.setState({
				rawData: JSON.stringify(profile),
				error: ""
			})
		);

		data.hub.on('logout', d =>
			this.setState({
				rawData: "",
				error: "User not logged in"
			})
		);
	},

	getInitialState: function() {
		return {
			error: "" 
		};
	},

	render: function() {
		return (
			<div className ="row">
				<div className ="col-md-12">
					<div className="error">
						{this.state.error}
					</div>
					<pre>{this.state.rawData}</pre>
				</div>
			</div>
		);
	}

});

module.exports = Profile;