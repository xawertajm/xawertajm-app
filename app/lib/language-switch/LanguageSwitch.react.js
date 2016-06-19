var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var I18n = require('ixaris-uxf').i18n;
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var Radium = require('radium');

var LanguageSwitch = React.createClass({
	mixins: [PureRenderMixin, I18nMixin],
	getInitialState: function() {
		return {};
	},
	render: require('./LanguageSwitch.rt.html'),
	changeLocation: function(e) {
		e.preventDefault();
		this.route.location(e.target.getAttribute("href"));
	},

	changeLocale: function(e) {
		e.preventDefault();
		I18n.setLocale(e.target.getAttribute("href"));
	}

});

module.exports = Radium(LanguageSwitch);
