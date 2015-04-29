var React = require('react'),
	data = require('../data.js');

var register = React.createClass({

	updateUsername: function (e) {
		this.setState({
			username: e.target.value
		});
	},
	updatePassword: function (e) {
		this.setState({
			password: e.target.value
		});
	},
	updatePasswordConfirm: function (e) {
		this.setState({
			passwordConfirm: e.target.value
		});
	},
	submitRegistration: function (e) {
		e.stopPropogation();
		if (this.state.password !==  this.state.passwordConfirm) {
			this.state.errors.push("Passwords don't match")
			this.setState({
				errors: this.state.errors
			});
		}
	},
	getInitialState: function() {
		return {
			errors: [] 
		};
	},
	render: function() {
		var errors = this.state.errors.map(function (msg) {
			return (
				<div className="error">
					{msg}
				</div>
			);
		});
		return (
			<div>	
				<form className="form">
					<input className="form-control" type='text' onChange={this.updateUsername} placeholder="username"/>
					<input className="form-control" type='password' onChange={this.updatePassword} placeholder="password"/>
					<input className="form-control" type='password' onChange={this.updatePasswordConfirm} placeholder="passwordConfirm"/>
					{errors}
					<button className="form-control btn btn-default" onClick={this.submitRegistration}>Sign up</button>
				</form>
			</div>
		);
	}

});

module.exports = register;