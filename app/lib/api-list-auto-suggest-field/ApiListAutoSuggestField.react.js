
var React = require('react');
var MetaData = require('ixaris-uxf').React.MetaData;
var AutoSuggestComponent = require('../auto-suggest-field/AutoSuggestField.react');
var Promise = require('es6-promise-polyfill').Promise;

var ApiListAutoSuggest = React.createClass({
	metaData : {
		documentation : 'An input field with auto-suggest capabilities',
		type : MetaData.ComponentType.INLINE,
		displayName : 'ApiListAutoSuggestField',
		props : {
			placeholder : {
				documentation : 'Will show as a placeholder',
				type : React.PropTypes.string,
				defaultValue : 'Start typing ...'
			},
			doCall : {
				documentation : 'A function returning a promise that will return lists from an API call',
				type : React.PropTypes.func.isRequired
			},
			throttleTime : {
				documentation : 'The time (ms) queries on list will be throttled before allowed to be executed',
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
	
	_filter : function(val) {
		return new Promise(function(resolve, reject) {
			if (!val) {
				resolve(val, []);
			} else {
				this.props.doCall(val).then(resolve).catch(reject);
			}
		}.bind(this));
	},
	render : function() {
		return <AutoSuggestComponent filter={this._filter} placeholder={this.props.placeholder} throttleTime={this.props.throttleTime} />
	}
});

module.exports = MetaData(ApiListAutoSuggest);