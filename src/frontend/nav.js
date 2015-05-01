var React = require('react'),
	Link = require('react-router-component').Link,
	data = require('./data.js');

var geturl = function  (route) {
	return route.name;
};

var nav = React.createClass({

	componentWillMount: function() {
		data.hub.on('login', e => this.setState({
			user: e,
		}));
		data.hub.on('logout', e => this.setState({
			user: undefined
		}))
	},

	getInitialState: function() {
		var user = data.isLoggedIn();
		return {
			user,
		};
	},

	doLogout: function  (e) {
		e.preventDefault();
		data.logout();
	},

	render: function() {
		var userAuthLink = (<Link href="/login">Login</Link>);
		if (this.state.user) {
			userAuthLink = (<a href='' onClick={this.doLogout}>Logout</a>);
		}
		var homestring = this.state.user ? this.state.user.username : "Home";

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#">Strawman</a>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						<ul className="nav navbar-nav">
							<li role="presentation">
								<Link href="/">{homestring}</Link>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li role="presentation">
								{userAuthLink}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}

});

module.exports = nav;