var React = require('react');

var AvailableBot = React.createClass({

    propTypes: {
        // bot
    },

    render: function() {
        return (
            <li className="available-bot" onClick={this._add_bot}>
                <img className="user-image" src={'static/' + this.props.bot.get('photo_url')} />
                {this.props.bot.get('name')}
            </li>
        );
    },

    _add_bot: function() {
        this.props.stream.add_bot(this.props.bot.id);
    }

});

module.exports = AvailableBot;
