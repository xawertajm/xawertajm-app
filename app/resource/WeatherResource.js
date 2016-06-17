"use strict";

var Resource = require('ixaris-uxf').Resource;

var WeatherResource = {
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
}//new Resource('http://jsonplaceholder.typicode.com/posts/');

module.exports = WeatherResource;