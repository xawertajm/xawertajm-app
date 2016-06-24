var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var I18nMixin = require('ixaris-uxf').React.I18nMixin;
require('./Index.i18n');
var WeatherResource = require('../resource/WeatherResource');

var Index = React.createClass({

    mixins: [PureRenderMixin, I18nMixin],

    getInitialState: function () {
        return {
            content: null,
            modal: null
        };
    },

    render: function() {
        var _this = this;
        WeatherResource.get({}, function(data) {
            console.log(data);
            _this.obj = data;
            return require('./Index.rt.html').call(_this);
        });

    },

    _setContent: function(el) {
        this.setState({ 
            toggled: false,
            content: el 
        });
    },

    _showModal: function(el) {
        this.setState({ 
            toggled: false,
            modal: el 
        });
    },

    _openMenu: function(e) {
        e.preventDefault();
        this.setState({ toggled: true });
    },

    _closeMenu: function(e) {
        e.preventDefault();
        this.setState({ toggled: false });
    }

});

module.exports = Index;
