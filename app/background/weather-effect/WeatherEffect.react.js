var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var WeatherStore = require('../../store/WeatherStore');

function getCurrentWeather() {
	return {
		show : WeatherStore.Store.getWeather().washCar == 'True'
	};
}

var WeatherEffect = React.createClass({

	mixins: [PureRenderMixin, I18nMixin],

	getInitialState: function () {
		return {
			show : false
		}
	},
	componentWillMount : function() {
		WeatherStore.Store.addChangeListener(this._gotWeather);
	},

	componentDidMount : function() {
		WeatherStore.Actions.getWeather();
	},

	componentWillUnmount : function () {
		WeatherStore.Store.removeChangeListener(this._gotWeather);
	},


	render: require('./WeatherEffect.rt.html'),
	_gotWeather: function() {
		var weatherState = getCurrentWeather();
		this.setState(weatherState);
	}

});


module.exports = WeatherEffect;