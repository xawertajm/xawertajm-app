
var React = require('react');
var MetaData = require('ixaris-uxf').React.MetaData;
var AutoSuggestComponent = require('../auto-suggest-field/AutoSuggestField.react');
var Promise = require('es6-promise-polyfill').Promise;

function _cleanStringForRegex(string) {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var FixedListAutoSuggest = React.createClass({
	metaData : {
		documentation : 'An input field with auto-suggest capabilities',
		type : MetaData.ComponentType.INLINE,
		displayName : 'FixedListAutoSuggestField',
		props : {
			placeholder : {
				documentation : 'Will show as a placeholder',
				type : React.PropTypes.string,
				defaultValue : 'Start typing ...'
			},
			throttleTime : {
				documentation : 'The time (ms) queries on list will be throttled before allowed to be executed',
				type : React.PropTypes.number,
				defaultValue : 200
			},
			list : {
				documentation : 'The list among which the auto suggestion will work', 
				type : React.PropTypes.array,
				defaultValue : []
			}
		},
		children : {
			noChildren : {
				type : MetaData.ChildValidation.Exactly(0),
				documentation : 'Element should not have any child elements'
			}
		}
	},
	_filter:  function(val) {
		return new Promise(function(resolve, reject) {
			if (!val) {
				resolve([]);
			} else {
				resolve(this.props.list.filter(function(item) {
					return !!item.match(new RegExp(_cleanStringForRegex(val), 'g'));
				}));
			}
		}.bind(this));
	},
	render : function() {
		return <AutoSuggestComponent filter={this._filter} placeholder={this.props.placeholder} throttleTime={this.props.throttleTime} />
	}
});

module.exports = MetaData(FixedListAutoSuggest);