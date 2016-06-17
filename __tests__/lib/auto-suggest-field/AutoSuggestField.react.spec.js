var ComponentInteractionTest = require('ixaris-uxf/lib/test-utils/utils').ComponentInteractionTest();
var IxarisUxfTestUtils = require('ixaris-uxf/lib/test-utils/utils');

var expect = require('chai').expect;
var React = require('react');
var Promise = require('es6-promise-polyfill');

var AutoSuggestField = require('../../../app/lib/auto-suggest-field/AutoSuggestField.react');
var ReactTestUtils = require('react-addons-test-utils');

describe('AutoSuggestField', function() {
	it('should report an error if no filter function is passed', function() {
		var _errors = IxarisUxfTestUtils.captureErrorLog(function() {
			React.createElement(AutoSuggestField);
		});

		expect(_errors.length).to.equal(1);
		expect(_errors[0]).to.equal('Warning: Failed propType: Required prop `filter` was not specified in `AutoSuggestField`.');
	});

	it('should have throttleTime property (set to 200ms)', function() {
		var _autoSuggest = React.createElement(AutoSuggestField, {filter : function(){}});
		expect(!!_autoSuggest.type.defaultProps.throttleTime).to.be.true;
		expect(_autoSuggest.type.defaultProps.throttleTime).to.equal(200);
	});

	it('should complain if child elements are given to it', function() {
		var div = React.createElement('div', {key : '__div'});

		var _errors = IxarisUxfTestUtils.captureErrorLog(function() {
			React.createElement(AutoSuggestField, {filter : function(){}, children: [div]});
		});

		expect(_errors.length).to.equal(1);
		expect(_errors[0]).to.equal('Warning: Failed propType: `AutoSuggestField` should have exactly [0] children. There are [1] children in your definition.');
	});
});

describe('AutoSuggestField - Component Interaction Test', function() {
	it('<ul> should appear on user input if results are returned', function(done) {
		var _mockFunction = function() {
			return Promise.Promise.resolve(['AA','BB']);
		}

		var _reactElement = React.createElement(AutoSuggestField, {filter : _mockFunction, throttleTime : 0});
		var _renderedComponent = ComponentInteractionTest.React.render(_reactElement);

		var _preChangeUl = ReactTestUtils.scryRenderedDOMComponentsWithTag(_renderedComponent, 'ul');
		expect(Object.keys(_preChangeUl).length).to.equal(0);

		IxarisUxfTestUtils.testAsync(function() {
			var inputNode = ReactTestUtils.findRenderedDOMComponentWithTag(_renderedComponent, 'input');
			inputNode.value = 'A';
			ReactTestUtils.Simulate.change(inputNode);
		}, done).then(function() {
			var _postChangeUl = ReactTestUtils.scryRenderedDOMComponentsWithTag(_renderedComponent, 'ul');
			expect(Object.keys(_postChangeUl).length).to.equal(1);
			done();
		});
	});
});