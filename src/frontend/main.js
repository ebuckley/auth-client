var React = require('react'),
	Login = require('./login'),
	Profile = require('./profile'),
	data = require('./data'),
	Register = require('./login/register');

React.render(
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				<h2>Login</h2>
				<Login/>
			</div>
		</div>
		<div className="row">
			<div className="col-md-12">
				<h2>Register</h2>
				<Register/>
			</div>
		</div>
		<div className="row">
			<div className="col-md-12">
				<h2>Profile</h2>
				<Profile/>
			</div>
		</div>
	</div>
	,
	document.getElementById('main')
)