var React = require('react');
var Backbone = require('backbone');
var _ = require('lodash');
var Input = require('app/components/stream/input');
var Messages = require('app/components/stream/messages');
var Users = require('app/components/stream/users');

var ChatRoom = React.createClass({

    propTypes: {
        // stream
        // bots
    },

    componentWillMount: function() {
        this.props.stream.query();
        this._start_pollers();
    },

    componentWillUnmount: function() {
        this._clear_pollers();
    },

    render: function() {
        // wait for this.props.stream.stream_id
        return (
            <div className="stream row">
                <Users stream={this.props.stream} bots={this.props.bots} />
                <Messages stream={this.props.stream} bots={this.props.bots} />
                <Input stream={this.props.stream} bots={this.props.bots} />
            </div>
        );
    },

    _start_pollers: function() {
        this._query_poller = setInterval(function() {
            this.props.stream.query();
        }.bind(this), 500);

        this._ping_poller = setInterval(function() {
            this.props.stream.ping();
        }.bind(this), 30000);
    },

    _clear_pollers: function() {
        clearInterval(this._query_poller);
        clearInterval(this._ping_poller);
    }

});

module.exports = ChatRoom;
