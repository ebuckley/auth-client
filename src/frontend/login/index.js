var React = require('react'),
	Register = require('./register'),
	data = require('../data.js');

var jotTokenKey = "jotAuthToken";
var login = React.createClass({
	
	onLogin: function  (e) {
		var that = this;
		data.authRequest(this.state.username, this.state.password)
		.then(function (resp) {
			if (resp.statusCode == 200) {
				that.setState({
					isAuthed: true,
					token: resp.body
				});
				localStorage.setItem(jotTokenKey, resp.body);
			} else {
				that.state.errors.push("Recieved bad response: " + JSON.stringify(resp.body))
				that.setState({
					errors:  that.state.errors
				});
			}
		});
		e.preventDefault();
	},
	componentWillMount: function() {
		var token = localStorage.getItem(jotTokenKey);
		if (token) {
			this.state.isAuthed = true;
			this.state.token = token;
		} else {
			this.state.isAuthed = false;
		}
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

	logout: function (e) {
		localStorage.removeItem(jotTokenKey)
		this.setState({
			isAuthed: false,
			token: undefined 
		});
	},

	clearErrors: function (e) {
		this.setState({
			errors: [] 
		});
	},

	render: function() {
		var errors = this.state.errors.map(function (err) {
			return (<div className='error'>{err}</div>)
		});

		var errorClearer = (
			<button className ='btn btn-sm btn-default' onClick={this.clearErrors}>
				<span className='glyphicon glyphicon-remove'></span>
			</button>
		);

		var clearIfErrors = this.state.errors.length ? errorClearer : undefined;


		var loginForm = (
			<div className="login-form">


				{clearIfErrors}
				{errors}
				<form action="#" className="form form-inline">
					<input className="form-control" type="text" placeholder="username" onChange={this.updateUser}></input>
					<input className="form-control" type="password" placeholder="password" onChange={this.updatePw}></input>
					<button onClick={this.onLogin} className="btn btn-danger" > Login </button>
				</form>
			</div>
		);
		var didLogin = (
			<div>
				Welcome back {this.state.username}
				<br/>
				<button onClick={this.logout} className="btn btn-default"> Logout </button>
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