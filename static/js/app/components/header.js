var React = require('react');

var Header = React.createClass({

    render: function() {
        return (
            <div className="header">
                <a className="rewrite logo" href="">Debate-a-bot</a>
            </div>
        );
    }

});

module.exports = Header;
