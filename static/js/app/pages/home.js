var React = require('react');
var Backbone = require('backbone');
var _ = require('lodash');
var Input = require('app/components/stream/input');
var Messages = require('app/components/stream/messages');
var Users = require('app/components/stream/users');

var CHATS = [
    [1, 4],
    [2, 3, 4],
    [1, 2, 3]
];

var Home = React.createClass({

    componentDidMount: function() {
        this.props.bots.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.bots.off(null, null, this);
    },

    render: function() {
        var premade_chats = _.map(CHATS, function(bot_ids) {
            var users = _.map(bot_ids, function(bot_id) {
                var bot = this.props.bots.get(bot_id);
                return bot ? this._bot_list_item(bot) : undefined;
            }, this);

            var url = 'stream/' + bot_ids.join(',');

            return (
                <div className="four columns">
                    <a className="rewrite" href={url}>
                        <ul>
                            <h3>Join</h3>
                            <hr />
                            {users}
                        </ul>
                    </a>
                </div>
            );
        }, this);

        var split_point = Math.ceil(this.props.bots.size() / 2);
        var all_bots = {
            left: [],
            right: []
        };

        _.each(this.props.bots.models, function(bot, i) {
            if (i < split_point)  {
                all_bots.left.push(this._bot_list_item(bot));
            } else {
                all_bots.right.push(this._bot_list_item(bot));
            }
        }, this);

        return (
            <div className="home-page row">
                <div className="hero">
                    <img className="logo" src="static/images/robot.svg" />
                    <h1>Debate-a-bot</h1>
                    <div className="row">
                        {premade_chats}
                    </div>
                </div>
                <div className="row">
                    <div className="four columns offset-by-two">
                        <ul className="botlist">
                            {all_bots.left}
                        </ul>
                    </div>
                    <div className="four columns">
                        <ul className="botlist">
                            {all_bots.right}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    },

    _bot_list_item: function(bot) {
        return (
            <li>
                <img src={'static/' + bot.get('photo_url')} />
                {bot.get('name')}
            </li>
        );
    }


});

module.exports = Home;
