var expect = require('chai').expect;
var React = require('react');
var ReactDomServer = require('react-dom/server');

var IxarisUxfTestUtils = require('ixaris-uxf/lib/test-utils/utils');
IxarisUxfTestUtils.mockGlobals();
var ScreenHeader = require('../../../app/lib/screen-header/ScreenHeader.react');

describe('ScreenHeader', function() {
	afterEach(function() {
		ScreenHeader.displayName = 'ScreenHeader';
	});
	it('should have metaData', function() {
		
		expect(ScreenHeader.prototype.getMetaData).to.exist;
		expect(!!ScreenHeader.prototype.getMetaData()).to.be.true;
	});

	it('should complain if no child element is passed', function() {
		//React does not "throw" exceptions which carry a message identical to another exception
		//thrown before. This small trick (changing the displayName) causes the message to change each time
		//hence having a new exception (even if with an "identical" message).
		ScreenHeader.displayName = ScreenHeader.displayName + '(test1)';

		var _errors = IxarisUxfTestUtils.captureErrorLog(function() {
			React.createElement(ScreenHeader);
		});

		expect(_errors.length).to.equal(1);
		expect(_errors[0]).to.equal('Warning: Failed propType: `ScreenHeader(test1)` should have exactly [1] children of type `span,Translate`. There are [0] in your definition.');
	});

	it('should complain if no <span> or <Translate> is passed as a child element', function() {
		ScreenHeader.displayName = ScreenHeader.displayName + '(test2)';
		
		var div1 = React.createElement('p', {key : '_div1'});
		var div2 = React.createElement('div', {key : '_div2'});

		var _errors = IxarisUxfTestUtils.captureErrorLog(function() {
			React.createElement(ScreenHeader, {children : div1});
		});

		expect(_errors.length).to.equal(1);
		expect(_errors[0]).to.equal('Warning: Failed propType: `ScreenHeader(test2)` should have exactly [1] children of type `span,Translate`. There are [0] in your definition.');
	});

	it('should render according to this spec', function() {
		var span = React.createElement('span', {key : '__span', name : 'mySpan'});

		var renderedDomSpan = ReactDomServer.renderToStaticMarkup(React.createElement(ScreenHeader, {children : [span]}));
		expect(renderedDomSpan).to.equal('<h1><span name="mySpan"></span></h1>');
	});
});