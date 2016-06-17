var ComponentInteractionTest = require('ixaris-uxf/lib/test-utils/utils').ComponentInteractionTest();
var IxarisUxfTestUtils = require('ixaris-uxf/lib/test-utils/utils');

var expect = require('chai').expect;
var React = require('react');

var ApiListAutoSuggestField = require('../../../app/lib/api-list-auto-suggest-field/ApiListAutoSuggestField.react');
var ReactTestUtils = require('react-addons-test-utils');
var Promise = require('es6-promise-polyfill');

var _doCall = function(val) {
	//mock API call
	var returnList = [];
	switch(val) {
		case 'A' : returnList = ['AA'];
			break;
		default : returnList = ['XX','YY'];
	}

	return Promise.Promise.resolve(returnList);
}

var _reactElement;
var _renderedComponent;

describe('ApiListAutoSuggestField - Component Interaction Test', function() {
	beforeEach(function() {
		_reactElement = React.createElement(ApiListAutoSuggestField, {doCall : _doCall, throttleTime : 0});
		_renderedComponent = ComponentInteractionTest.React.render(_reactElement);
	});

	it('should filter among the returned list by the API - case 1', function(done) {
		IxarisUxfTestUtils.testAsync(function() {
			//trigger selection of 'AA'
			var inputNode = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'input');
			inputNode.value = 'A';
			ReactTestUtils.Simulate.change(inputNode);
		}, done).then(function() {
			ComponentInteractionTest.takeScreenshot('screenshots','ApiListAutoSuggestField - test ULs (1)');
			var _ulScry = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'ul');
			var _listElements = _ulScry.getElementsByTagName("li");
			expect(_listElements.length).to.equal(1);
			done();
		});
	});

	it('should filter among the returned list by the API - case 2', function(done) {
		IxarisUxfTestUtils.testAsync(function() {
			//trigger selection of 'XX','YY'
			var inputNode = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'input');
			inputNode.value = 'KK';
			ReactTestUtils.Simulate.change(inputNode);
		}, done).then(function() {
			var _ulScry = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'ul');
			ComponentInteractionTest.takeScreenshot('screenshots','ApiListAutoSuggestField - test ULs (2)');
			var _listElements = _ulScry.getElementsByTagName("li");
			expect(_listElements.length).to.equal(2);
			done();
		});
	});
});