var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var MetaData = require('ixaris-uxf').React.MetaData;
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var Radium = require('radium');

var FixedSideLayout = React.createClass({

    mixins: [PureRenderMixin, I18nMixin],
    metaData : {
    	documentation : 'A layout with a fixed side pane, and a main component in the center',
    	type : MetaData.ComponentType.BLOCK,
    	displayName : 'FixedSideLayout',
    	keywords : ['layout','fixedside'],
    	props : {
    		toggled : {
    			documentation : 'States whether the side-pane is toggled',
    			type : React.PropTypes.bool
    		},
    		onOverlayClick : {
    			documentation : 'A function which will trigger once the overlay is clicked',
    			type : React.PropTypes.func
    		}
    	},
    	children : {
    		side : {
    			documentation : 'The first child element will be put on the side - and this needs to be wrapped in a `div`',
    			type : MetaData.ChildValidation.AtLeastOne.ofType('div')
    		},
    		allTheRest : {
    			documentation : 'All other child elements will be put in the main section',
    			type : MetaData.ChildValidation.Any
    		}
    	}
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            toggled: nextProps.toggled
        });
    },
    firstChild : function() {
        return (this.props.children && this.props.children[0]);
    },
    allOtherChildren : function() {
    	if (this.props.children && this.props.children.length > 1) {
    		return this.props.children.slice(1, this.props.children.length);
    	} else {
    		return;
    	}
    },

    render: require('./FixedSideLayout.rt.html')
});

module.exports = MetaData(Radium(FixedSideLayout));