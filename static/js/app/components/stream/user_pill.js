var React = require('react');
var _ = require('lodash');

var UserPill = React.createClass({

    propTypes: {
        // model
    },

    render: function() {
        var close = _.keys(this.props.stream.bots).length > 1 ? (
            <span className="remove" onClick={this._remove_user}>
                <i className="fa fa-close" />
            </span>
        ) : undefined;

        return (
            <div className="user-pill">
                <div className="user-image">
                    <img className="profile" src={'static/' + this.props.model.get('photo_url')} />
                </div>
                {this.props.model.get('name')}
                {close}
            </div>
        );
    },

    _remove_user: function() {
        this.props.stream.remove_bot(this.props.model.get('bot_id'));
    }

});

module.exports = UserPill;
