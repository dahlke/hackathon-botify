var React = require('react');

var YEEZY = "http://wundergroundmusic.com/wp-content/uploads/2014/09/Kanye-West-750x400.jpg";

var Message = React.createClass({

    propTypes: {
        // bot
        // model
    },

    render: function() {
        var text = this.props.model.get('text') ? this.props.model.get('text') : (
            <img className="typing" src="static/images/typing.svg" />
        );

        var photo, name;

        if (this.props.bot) {
            name = this.props.bot.get('name');
            photo = this.props.bot.get('photo_url')
        } else {
            name = "Me";
        }

        return (
            <div className="message">
                <div className="user-image">
                    <img className="profile" src={'static/' + photo} />
                </div>
                <span className="name">
                    {name}
                </span>
                <span className="text">
                    {text}
                </span>
            </div>
        );
    }

});

module.exports = Message;
