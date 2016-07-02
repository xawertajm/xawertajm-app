var AppDispatcher = require('../AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var keyMirror = require('keymirror');
var WeatherResource = require('../resource/WeatherResource');

var CHANGE_EVENT = 'change';

var hasWeather = !!sessionStorage.getItem('weather');

function _getWeather() {
	WeatherResource.get({}, function(data) {
		var _weather = JSON.parse(data)[0];
		sessionStorage.setItem('weather', JSON.stringify(_weather));
		hasWeather = true;
		Weather.Store.emitChange();
	}, function(err, res) {
		hasWeather = false;
		Weather.Store.emitChange();
	});
}

var Weather = {

	Constants : keyMirror({
		GET_WEATHER: null
	}),

	Actions : {
		getWeather : function() {
			AppDispatcher.dispatch({
				actionType: Weather.Constants.GET_WEATHER
			});
		}
	},

	Store : _.assign({}, EventEmitter.prototype, {

		hasWeather: function() {
			return hasWeather;
		},

		getWeather: function() {
			var _weather = JSON.parse(sessionStorage.getItem('weather'));
			if (_weather.predictionBasis && Object.keys(_weather.predictionBasis).indexOf('daysUntilRain') >= 0) {
				_weather.predictionBasis.daysUntilRain = Number(_weather.predictionBasis.daysUntilRain);
			}
			return _weather;
		},

		emitChange: function() {
			this.emit(CHANGE_EVENT);
		},

		addChangeListener: function(callback) {
			this.on(CHANGE_EVENT, callback);
		},

		removeChangeListener: function(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		}

	})

};

AppDispatcher.register(function(action) {

	switch(action.actionType) {

		case Weather.Constants.GET_WEATHER:
			_getWeather();
			break;
		default:
			// no op
	}
});

module.exports = Weather;