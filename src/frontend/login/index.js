var React = require('react'),
	Register = require('./register'),
	Link = require('react-router-component').Link,
	data = require('../data.js');

var jotTokenKey = "jotAuthToken";

var loginHandler, logoutHandler, loginError;
var login = React.createClass({
	
	onLogin: function  (e) {
		var that = this;
		data.authRequest(this.state.username, this.state.password)
		.then(function () {}, function (body) {
			data.hub.emit('loginerror', body);
			
		});
		e.preventDefault();
	},
	componentWillMount: function() {
		var cmp = this;

		loginError = function (e) {
			cmp.state.errors.push("Recieved bad response: " + JSON.stringify(e))
			cmp.setState({
				errors:  cmp.state.errors
			});
		}
		loginHandler = function  (e) {
			cmp.setState({
				isAuthed: true, 
				token: e,
				username: e.username
			});
		};
		data.hub.on('login', loginHandler);

		logoutHandler = function  (e) {
			cmp.setState({
				isAuthed: false,
				token: undefined,
				username: undefined
			});
		};
		data.hub.on('logout', logoutHandler);

		//set initial state
		var token = data.isLoggedIn()
		if (token) {
			this.state.isAuthed = true;
			this.state.token = token;
			this.state.username = token.username;
		} else {
			this.state.isAuthed = false;
			this.state.token = false;
		}
	},
	componentWillUnmount: function() {
		data.hub.off('login', loginHandler);
		data.hub.off('logout', logoutHandler);
		data.hub.off('loginerror', loginError);
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
		data.logout();
		
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
				<Link href="/register">Register</Link>
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