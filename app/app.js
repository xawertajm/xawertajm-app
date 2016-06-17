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
}
var React = require('react');
var ReactDom = require('react-dom');
var Index = require('./index/Index.react');
var I18n = require('ixaris-uxf/lib/i18n');


require('ixaris-uxf/lib/style').Branding.load(require('./style/styleConfig.json'));

var div = document.createElement("div");
document.body.appendChild(div);
ReactDom.render(React.createElement(Index), div);
I18n.setDefault("mt");