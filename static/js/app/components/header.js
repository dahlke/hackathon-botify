var React = require('react');

var Header = React.createClass({

    render: function() {
        return (
            <div className="header">
                <a className="rewrite logo" href="">Debate-a-bot</a>
                <button onClick={this._add_bot} className="add">
                    <i className="fa fa-plus" /> bot
                </button>
            </div>
        );
    },

    _add_bot: function() {
        console.log('adding a bot');
    }

});

module.exports = Header;
