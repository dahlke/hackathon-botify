var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

var Input = React.createClass({

    propTypes: {
        // stream
    },

    getInitialState: function() {
        return {
            text: ''
        };
    },

    render: function() {
        return (
            <div className="input-row twelve columns">
                <button className="button-primary send" onClick={this._send_message}>Send</button>
                <input type="text" ref="message" onChange={this._handle_change} onKeyDown={this._handle_keydown} value={this.state.text} />
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
    }

});

module.exports = Input;
