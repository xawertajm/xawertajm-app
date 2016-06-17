var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var Router = require('ixaris-uxf').Router;
var I18n = require('ixaris-uxf').i18n;
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var Radium = require('radium');

var Menu = React.createClass({

	mixins: [PureRenderMixin, I18nMixin],

	propTypes: {
        setContent: React.PropTypes.func.isRequired,
        showModal: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
    	return {};
    },

    componentWillMount: function() {
		this.route = Router.add(this, '').when('', function() {
			this.props.setContent(<Screen1 />);
		}, true).when('screen_2', function() {
			this.props.setContent(<Screen2 />);
		}, true);
	},

	componentDidMount: function() {
		this.route.start();
    },

    componentWillUnmount: function() {
        this.route.remove();
	},

	render: require('./Menu.rt.html'),
  
	changeLocation: function(e) {
		e.preventDefault();
		this.route.location(e.target.getAttribute("href"));
	},

	changeLocale: function(e) {
		e.preventDefault();
		I18n.setLocale(e.target.getAttribute("href"));
	}

});

module.exports = Radium(Menu);
