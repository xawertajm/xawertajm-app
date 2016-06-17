//
// Works in Progress - to adapt with TrifleJS
//

var page = require('webpage').create();
var system = require('system');
//var http = require('http');

page.viewportSize = {
	width: 1024,
	height: 768
};
page.zoomFactor = 1;
page.onConsoleMessage = function(msg) {
	system.stdout.writeLine('Test console : ' + msg);
};

page.onCallback = function(data) {
	switch(data.type) {
		case 'render' : page.render('./screenshots/' + data.filename + '.png');
			console.log('Taking Screenshot '+data.filename);
			break;
		case 'refresh' : page.reload();
			console.log('Refreshing page');
			break;
		case 'evaluate' : 
			page.evaluateJavaScript(data.evaluate);
			break;
		case 'close' :
			page.close();
			break;
		case 'exit' :
			console.log('exit');
			//page.close();
			console.log('exit 1');
			page.open('http://localhost:8091/', function(status) {
				console.log('exit 2');
				//page.close();
			});
			setTimeout(function() {
				phantom.exit();
			}, 50);
			// http.request({
			// 	host : 'localhost'
			// 	path : '/',
			// 	port : '8091',
			// 	method : 'GET'
			// }, function() {
			// 	console.log('Closing server');
			// }).end();
			break;
	}
}

console.log('Opening page');
var local = 'file:///C:/dev/trees/ope/ixaris-uxf-seed/__tests__/__browser_tests/empty.html';
var remote = "http://localhost:8090/__tests__/__browser_tests__/empty.html";
var reload = 0;
var chalie = page.open;
(function(_o) {
	console.log('>>> intercepted');
	console.log('_open', Object.keys(this));
	_o.call(this);
})(chalie);

page.open('empty.html', function (status) {
	console.log('Page load - ', status);
	if (status === 'fail' && reload < 10) {
		page.reload();
		reload++;
	} else if (reload === 10) {
		page.close();
		//callback.apply();
	} else if (status === 'success') {
		reload = 0;
		//callback.apply();
	}

});