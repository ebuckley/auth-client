var React = require('react'),
	Nav = require('./nav.js'),
	Template = require('./template.js');

React.render(
		<Template />
	,
	document.getElementById('react-view')
);

React.render(
	<Nav />,
	document.getElementById('react-nav')
);