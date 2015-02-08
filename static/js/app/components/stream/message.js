var React = require('react');

var YEEZY = "http://wundergroundmusic.com/wp-content/uploads/2014/09/Kanye-West-750x400.jpg";

var Message = React.createClass({

    propTypes: {
        // bot
        // model
    },

    render: function() {
        var photo, name;
        if (this.props.bot) {
            name = this.props.bot.get('name');
            photo = this.props.bot.get('photo_url');
        } else {
            name = "Me";
            photo = "images/user.jpg";
        }

        return (
            <div className="message">
                <div className="user-image">
                    <img className="profile" src={'static/' + photo} />
                </div>
                <span className="name">
                    {name}
                </span>
                <p className="text">
                    {this.props.model.get('text')}
                </p>
            </div>
        );
    }

});

module.exports = Message;
