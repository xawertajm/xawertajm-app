var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var Translate = require('ixaris-uxf').React.Translate;
var MetaData = require('ixaris-uxf').React.MetaData;

var ScreenHeader = React.createClass({

	metaData : {
		documentation : 'Presents a child element as header for a screen',
		displayName : 'ScreenHeader',
		type : MetaData.ComponentType.BLOCK,
		children : {
			header : {
				documentation : 'Only accepts span or `Translate` elements',
				type : MetaData.ChildValidation.ExactlyOne.ofType(['span','Translate'])
			}
		}
	},
  
	render: function() {
		return (
			<h1>{this.props.children}</h1>
		);
	}

});

module.exports = MetaData(ScreenHeader);
