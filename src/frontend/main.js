var React = require('react'),
	Login = require('./login'),
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
	</div>
	,
	document.getElementById('main')
)