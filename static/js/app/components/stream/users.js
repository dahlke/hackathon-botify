var React = require('react');
var _ = require('lodash');
var AvailableBots = require('app/components/stream/available_bots');
var UserPill = require('app/components/stream/user_pill');

var Users = React.createClass({

    propTypes: {
        // stream
        // bots
    },

    getInitialState: function() {
        return {
            show_tooltip: false
        };
    },

    componentDidMount: function() {
        this.props.stream.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.stream.off(null, null, this);
    },

    render: function() {
        var ids = _.keys(this.props.stream.bots);

        var users = _.map(ids, function(id) {
            var bot = this.props.bots.get(id);
            return bot && id !== 'Me' ? <UserPill model={bot} stream={this.props.stream} /> : undefined;
        }, this);

        var tooltip = this.state.show_tooltip ? <AvailableBots bots={this.props.bots} stream={this.props.stream} /> : undefined;
        var button_class = 'add ' + (users.length >= 4 ? 'disabled' : '');

        return (
            <div className="user-pills twelve columns">
                {users}
                <button disabled={users.length >= 4} onClick={this._toggle_available} className={button_class}>
                    <i className="fa fa-plus" /> bot
                </button>
                {tooltip}
            </div>
        );
    },

    _toggle_available: function() {
        if (_.keys(this.props.stream.bots).length < 4) {
            this.setState({
                show_tooltip: !this.state.show_tooltip
            });
        }
    },

    _tooltip: function() {
        var available = _.filter(this.props.bots.models, function(bot) {
            return !this.props.stream.bots[bot.id];
        }.bind(this));
    },

    _update: function() {
        if (_.keys(this.props.stream.bots).length === 4) {
            this.setState({
                show_tooltip: false
            });
        } else if (this.isMounted()) {
            this.forceUpdate();
        }
    }

});

module.exports = Users;
