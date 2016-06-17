var expect = require('chai').expect;
var React = require('react');
var ReactDomServer = require('react-dom/server');

var IxarisUxfTestUtils = require('ixaris-uxf/lib/test-utils/utils');
IxarisUxfTestUtils.mockGlobals();
var FixedSideLayout = require('../../../app/lib/fixed-side-layout/FixedSideLayout.react');

describe('FixedSideLayout', function() {
	it('should have metaData', function() {
		
		expect(FixedSideLayout.prototype.getMetaData).to.exist;
		expect(!!FixedSideLayout.prototype.getMetaData()).to.be.true;
	});

	it('should throw warning if there is no one child element of type [div]', function() {
		var _errors = IxarisUxfTestUtils.captureErrorLog(function() {
			React.createElement(FixedSideLayout);
		});

		expect(_errors.length).to.equal(1);
		expect(_errors[0]).to.equal('Warning: Failed propType: `FixedSideLayout` should have at least [1] children of type `div`. '
									+'There are [0] in your definition.');
	});

	it('should render first <div> child element in <aside> and any other child in the <section> ', function() {
		var div = React.createElement('div', {key : '__div', name : 'firstDiv'});
		var p = React.createElement('p', { key : '__p'});
		var div2 = React.createElement('div', { key : '__div2', name : 'secondDiv'});
		var renderedDom = ReactDomServer.renderToStaticMarkup(React.createElement(FixedSideLayout, { children : [div, div2, p]}));
		expect(renderedDom).to.equal('<div class="">'
										+'<aside id="FixedSideLayout_Side">\r\n'
										+'        <div name="firstDiv"></div>\r\n    '
										+'</aside>'
										+'<div id="FixedSideLayout_Overlay"></div>'
										+'<section style="margin-left:268px;" id="FixedSideLayout_Container">\r\n'
										+'        <div name="secondDiv"></div><p></p>\r\n    '
										+'</section>'
									+'</div>');
	});
});