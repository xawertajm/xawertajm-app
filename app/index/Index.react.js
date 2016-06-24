var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
require('./Index.i18n');
//var WeatherResource = require('../resource/WeatherResource');
var WeatherStore = require('../store/WeatherStore');

function getCurrentWeather() {
	return {
		weather : WeatherStore.Store.getWeather()
	};
}

var Index = React.createClass({

	mixins: [PureRenderMixin, I18nMixin],

	getInitialState: function () {
		return {
			weather : {
				washCar : false,
				predictionBasis : {
					daysUntilRain : -1,
				}
			}
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


	render: require('./Index.rt.html'),
	_gotWeather: function() {
		var weatherState = getCurrentWeather();
		this.setState(weatherState);
	}

});


module.exports = Index;
