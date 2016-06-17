"use strict";

(function() {
	var Resource = require('ixaris-uxf').Resource;

	var LoremIpsumResource = new Resource('http://jsonplaceholder.typicode.com/posts/');
	
	module.exports = LoremIpsumResource;
})()