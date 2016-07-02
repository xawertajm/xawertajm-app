var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var I18n = require('ixaris-uxf').i18n;
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var Radium = require('radium');

var getCurrentLocale = function() {
	return {
		locale : I18n.getLocale()
	}
}

var LanguageSwitch = React.createClass({
	mixins: [PureRenderMixin, I18nMixin],
	getInitialState: function() {
		return getCurrentLocale()
	},
	render: require('./LanguageSwitch.rt.html'),

	componentWillMount : function() {
		I18n.addLocaleChangeListener(this._changeLocaleState);
	},
	componentWillUnmount : function() {
		I18n.removeLocaleChangeListener(this._changeLocaleState);
	},
	changeLocation: function(e) {
		e.preventDefault();
		this.route.location(e.target.getAttribute("href"));
		this._onChange();
	},
	changeLocale: function(e) {
		e.preventDefault();
		I18n.setLocale(e.target.getAttribute("href"));
	},
	_changeLocaleState : function() {
		this.setState(getCurrentLocale());
	}

});

module.exports = Radium(LanguageSwitch);
