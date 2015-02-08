var React = require('react');
var Backbone = require('backbone');
var _ = require('lodash');

var YEEZY = "http://wundergroundmusic.com/wp-content/uploads/2014/09/Kanye-West-750x400.jpg";

var Users = React.createClass({

    propTypes: {
        // stream
        // bots
    },

    componentDidMount: function() {
        this.props.stream.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.stream.off(null, null, this);
    },

    render: function() {
        var ids = _.uniq(_.map(this.props.stream.models, function(m) {
            return m.get('bot_id');
        }, this));

        var users = _.map(ids, function(id) {
            return id !== 'Me' ? this._user(id) : undefined;
        }, this);

        return (
            <div className="user-pills twelve columns">
                {users}
            </div>
        );
    },

    _user: function(bot_id) {
        var bot = this.props.bots.get(bot_id);

        if (!bot) {
            return;
        }

        return (
            <div className="user-pill">
                <div className="user-image">
                    <img className="profile" src={'static/' + bot.get('photo_url')} />
                </div>
                {bot.get('name')}
                <span className="remove" onClick={this._remove_user}>
                    <i className="fa fa-close" />
                </span>
            </div>
        );
    },

    _remove_user: function() {
        console.log('remove user');
    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    }

});

module.exports = Users;
