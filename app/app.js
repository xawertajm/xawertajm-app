// if (!global.document) {
// 	global.document = {
// 		body : {
// 			appendChild : function() {}
// 		},
// 		createElement : function() {}
// 	};
// }

// if (!global.window) {
// 	global.window = {
// 					addEventListener : function(){}
// 				};
//}
var React = require('react');
var ReactDom = require('react-dom');
var Index = require('./index/Index.react');
var Background = require('./background/Background.react');
var WeatherEffect = require('./background/weather-effect/WeatherEffect.react');
var I18n = require('ixaris-uxf/lib/i18n');


require('ixaris-uxf/lib/style').Branding.load(require('./style/styleConfig.json'));

var div = document.createElement("div");
var weatherEffect = document.createElement("div");
var bground = document.createElement("div");
document.getElementById('bground').appendChild(weatherEffect);
document.getElementById('bground').appendChild(bground);
document.body.appendChild(div);
ReactDom.render(React.createElement(Index), div);
ReactDom.render(React.createElement(Background), bground);
ReactDom.render(React.createElement(WeatherEffect), weatherEffect);
I18n.setDefault("mt");