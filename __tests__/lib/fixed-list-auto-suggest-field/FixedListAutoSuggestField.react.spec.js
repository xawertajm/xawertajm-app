var ComponentInteractionTest = require('ixaris-uxf/lib/test-utils/utils').ComponentInteractionTest();
var IxarisUxfTestUtils = require('ixaris-uxf/lib/test-utils/utils');

var expect = require('chai').expect;
var React = require('react');

var FixedListAutoSuggestField = require('../../../app/lib/fixed-list-auto-suggest-field/FixedListAutoSuggestField.react');
var ReactTestUtils = require('react-addons-test-utils');

var _list = ['AA','BB', 'AB'];
var _reactElement;
var _renderedComponent;
describe('FixedListAutoSuggestField - Component Interaction Test', function() {
	beforeEach(function() {
		_reactElement = React.createElement(FixedListAutoSuggestField, {list : _list, throttleTime : 0});
		_renderedComponent = ComponentInteractionTest.React.render(_reactElement);
	});

	it('should filter among the given list - case 1', function(done) {
		IxarisUxfTestUtils.testAsync(function() {
			//trigger selection of 'AA' and 'AB'
			var inputNode = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'input');
			inputNode.value = 'A';
			ReactTestUtils.Simulate.change(inputNode);
		}, done).then(function() {
			var _ulScry = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'ul');
			var _listElements = _ulScry.getElementsByTagName("li");
			expect(_listElements.length).to.equal(2);
			done();
		});
	});

	it('should filter among the given list - case 2', function(done) {
		IxarisUxfTestUtils.testAsync(function() {
			//trigger selection of 'AA'
			var inputNode = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'input');
			inputNode.value = 'AA';
			ReactTestUtils.Simulate.change(inputNode);
		}, done).then(function() {
			var _ulScry = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'ul');
			var _listElements = _ulScry.getElementsByTagName("li");
			expect(_listElements.length).to.equal(1);
			done();
		});
	})
});