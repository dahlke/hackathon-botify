var React = require('react');
var Backbone = require('backbone');
var _ = require('lodash');
var Input = require('app/components/stream/input');
var Messages = require('app/components/stream/messages');

var Home = React.createClass({

    getInitialState: function() {
        return {
            random_stream: ['1', '2', '3']
        };
    },

    componentDidMount: function() {
        this.props.bots.on('change add', this._update, this);
    },

    componentWillUnmount: function() {
        this.props.bots.off(null, null, this);
    },

    render: function() {
        var random_url = 'stream/' + this.state.random_stream.join(',');

        var random_stream = _.map(this.state.random_stream, function(bot_id) {
            var bot = this.props.bots.get(bot_id);
            return bot ? this._large_bot(bot) : undefined;
        }, this);

        var split_point = Math.floor(this.props.bots.size() / 3);
        var all_bots = {
            left: [],
            right: [],
            center: []
        };

        _.each(this.props.bots.models, function(bot, i) {
            if (i < split_point)  {
                all_bots.left.push(this._bot_list_item(bot));
            } else if (i < split_point * 2)  {
                all_bots.right.push(this._bot_list_item(bot));
            } else {
                all_bots.center.push(this._bot_list_item(bot));
            }
        }, this);

        return (
            <div className="home-page row">
                <div className="hero">
                    <img className="logo" src="static/images/robot.svg" />
                    <h1>Debate-a-bot</h1>
                    <div className="row">
                        <div className="twelve columns">
                            <h4>try a randomly generated stream...</h4>
                            <a className="rewrite" href={random_url}>
                                <ul>
                                    {random_stream}
                                </ul>
                            </a>
                        </div>
                        <button onClick={this._random_room}>Mo' Rando Bots</button>
                        <button className="button-primary" onClick={this._goto_random_room}>LET'S PEACEFULLY DEBATE</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h4>Or create your own!</h4>
                </div>
                <div className="row">
                    <div className="four columns">
                        <ul className="botlist">
                            {all_bots.left}
                        </ul>
                    </div>
                    <div className="four columns">
                        <ul className="botlist">
                            {all_bots.center}
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

    _random_room: function() {
        var bot_ids = _.map(this.props.bots.models, function(b) {
            return String(b.id);
        });

        this.setState({
            random_stream: _.sample(bot_ids, 3)
        });
    },

    _goto_random_room: function() {

    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    },

    _large_bot: function(bot) {
        return (
            <div className="large-bot" key={'large-bot-' + bot.id}>
                <img src={'static/' + bot.get('photo_url')} />
                <span className="bot-name">
                    {bot.get('name')}
                </span>
            </div>
        );
    },

    _bot_list_item: function(bot) {
        return (
            <li key={'home-bot-list-item' + bot.id}>
                <img src={'static/' + bot.get('photo_url')} />
                {bot.get('name')}
            </li>
        );
    }

});

module.exports = Home;
