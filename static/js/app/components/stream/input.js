var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var moment = require('moment');

var Input = React.createClass({

    propTypes: {
        // stream
    },

    getInitialState: function() {
        return {
            text: ''
        };
    },

    componentDidMount: function() {
        this.props.stream.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.stream.off(null, null, this);
    },

    render: function() {
        return (
            <div className="input-row twelve columns">
                <button className="send" onClick={this._send_message}>Send</button>
                <input type="text" ref="message" onChange={this._handle_change} onKeyDown={this._handle_keydown} value={this.state.text} />
                {this._typing()}
            </div>
        );
    },

    _handle_change: function(e) {
        this.setState({
            text: e.target.value
        });
    },

    _handle_keydown: function(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this._send_message();
        }
    },

    _send_message: function() {
        var msg = $(this.refs.message.getDOMNode()).val();

        if (msg.length === 0) {
            return;
        }

        this.props.stream.append(msg);

        this.setState({
            text: ''
        });
    },

    _typing: function() {
        var typers = this._typers();
        var typing;

        if (typers.length == 1) {
            typing = typers[0] + ' is typing';
        } else if (typers.length === 2) {
            typing = typers.join(' and ') + ' are typing';
        } else if (typers.length > 0) {
            typing = typers.length + ' people are typing';
        }

        return (
            <span className="typing">
                {typing}
            </span>
        );
    },

    _typers: function() {
        var bot_names = [];
        var pending_msgs = _.filter(this.props.stream.models, function(m) {
            var bot = this.props.bots.get(m.get('bot_id'));
            if (!bot || !bot.id) {
                return;
            }
            var in_stream = !!this.props.stream.bots[bot.id];
            if (in_stream && m.get('pending') && m.get('pending_time') <= Math.floor(+moment.utc() / 1000)) {
                bot_names.push(bot.get('name'));
                return true;
            }
            return  false;
        }, this);

        return _.uniq(bot_names);
    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    }

});

module.exports = Input;
