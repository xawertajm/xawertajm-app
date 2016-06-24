"use strict";

var Resource = require('ixaris-uxf').Resource;

var WeatherResource = new Resource('http://xawertajm-ws.herokuapp.com/result');

/*
{
	get : function(params, cb, ecb) {
		cb({
			washCar : false,
			predictionBasis : {
				daysUntilRain : 12,
				precipitation : 0.6
			},
			weatherDetails : {
				one : 'two'
			}
		});
	}
}
 */

module.exports = WeatherResource;