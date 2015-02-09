var React = require('react');
var _ = require('lodash');
var Modal = require('app/components/modal');
var AvailableBot = require('app/components/stream/available_bot');

var AvailableBots = React.createClass({

    propTypes: {
        // stream
        // bots
    },

    render: function() {
        var available = _.filter(this.props.bots.models, function(bot) {
            return !this.props.stream.bots[bot.id];
        }.bind(this));

        var available_items = _.map(available, function(bot) {
            return <AvailableBot bot={bot} stream={this.props.stream} />;
        }, this);

        return (
            <div className="add-bots-tooltip">
                <ul className="available-bots">
                    {available_items}
                </ul>
            </div>
        );
    }

});

module.exports = AvailableBots;
