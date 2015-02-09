var React = require('react');
var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jquery');
var Message = require('app/components/stream/message');

var INPUT_HEIGHT = 70;

var Messages = React.createClass({

    propTypes: {
        // messages
        // bots
    },

    componentDidMount: function() {
        this.props.stream.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.stream.off(null, null, this);
    },

    componentDidUpdate: function() {
        var msgs = this.refs.messages.getDOMNode();
        msgs.scrollTop = msgs.scrollHeight + 1000;
    },

    render: function() {
        var messages = _.map(this.props.stream.models, function(m) {
            var bot = this.props.bots.get(m.get('bot_id'));
            if (m.get('pending') > 0 || m.get('text') === 'null') {
                return false;
            }
            return <Message model={m} key={'message-' + m.cid} bot={bot} />;
        }, this);

        return (
            <div ref="messages" className="messages twelve columns">
                {messages}
            </div>
        );
    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    }

});

module.exports = Messages;
