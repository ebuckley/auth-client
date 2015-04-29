var React = require('react'),
	data = require('../data.js');

var login = React.createClass({
	
	onLogin: function  (e) {
		var that = this;
		data.authRequest(this.state.username, this.state.password)
		.then(function (resp) {
			if (resp.statusCode == 200) {
				that.setState({
					isAuthed: true,
					token: resp.body
				})
			}
			that.state.errors.push("Recieved bad response: " + JSON.stringify(resp.body))
			that.setState({
				errors:  that.state.errors
			});
			console.log('Error:', resp);
		});
		e.preventDefault();
	},
	getInitialState: function() {
		return {
			isAuthed: false,
			errors: []
		};
	},


	updateUser: function (e) {
		this.setState({
			username: e.target.value 
		});
	},
	updatePw: function (e) {
		this.setState({
			password: e.target.value
		});
	},

	render: function() {
		console.log('render when setstate happens');
		var errors = this.state.errors.map(function (error) {
			return (<div className='error'>{error}</div>)
		});

		var loginForm = (
			<div className="login-form">
				{errors}
				<form action="#" className="form form-inline">
					<input className="form-control" type="text" placeholder="username" onChange={this.updateUser}></input>
					<input className="form-control" type="password" placeholder="password" onChange={this.updatePw}></input>
					<button onClick={this.onLogin} className="btn btn-submit" > Login </button>
				</form>
			</div>
		);
		var didLogin = (
			<div>
				Welcome back {this.state.username}
				<br/>
			</div>
		);
		if (!this.state.isAuthed) {
			return loginForm;
		} else {
			return didLogin;
		}
	}

})
module.exports = login;