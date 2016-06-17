var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MetaData = require('ixaris-uxf').React.MetaData;
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
var Radium = require('radium');
var _ = require('lodash');
var Promise = require('es6-promise-polyfill');

function _cleanStringForRegex(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var AutoSuggestField = React.createClass({

	mixins : [LinkedStateMixin],

	metaData : {
		documentation : 'An input field with auto-suggest capabilities',
		type : MetaData.ComponentType.INLINE,
		displayName : 'AutoSuggestField',
		props : {
			filter : {
				documentation : 'A function that takes the user input string as a parameter and returns a promise that resolves the filtered list of matching items',
				type : React.PropTypes.func.isRequired,
			},
			placeholder : {
				documentation : 'Will show as a placeholder',
				type : React.PropTypes.string,
				defaultValue : 'Start typing ...'
			},
			throttleTime : {
				documentation : 'The time (ms) queries on list will be throttled (actually [debounce]d) before allowed to be executed',
				type : React.PropTypes.number,
				defaultValue : 200
			}
		},
		children : {
			noChildren : {
				type : MetaData.ChildValidation.Exactly(0),
				documentation : 'Element should not have any child elements'
			}
		}
	},
	getInitialState : function() {
		return {
			value : '',
			items: []
		}
	},

	componentWillUpdate: function(nextProps, nextState) {
		if (this.state.value !== nextState.value) {
			this._filter();	
		}
	},

	_highlight : function(item) {
		if(this.state.value) {
			var _reg = new RegExp(_cleanStringForRegex(this.state.value.trim()), 'g');
			return item.replace(_reg, '**'+this.state.value.trim()+'**');
		}
		else {
			return item;
		}
	},
	_filter: function() {
		_.debounce(function() {
			var value = this.state.value;
			this.props.filter(value).then(function(items) {
				if (this.state.value === value) { // just in case we get results out of order
					this.setState({items: items});
				}
			}.bind(this)).catch(function(msg) {
				console.error(msg);
			});
		}, this.props.throttleTime).call(this);
	},

	render: require('./AutoSuggestField.rt.html')
});

module.exports = MetaData(Radium(AutoSuggestField));