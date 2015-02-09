var React = require('react');
var _ = require('lodash');

var PickerListItem = React.createClass({

    propTypes: {
        //stream
        //bot
        //num_selected
        //on_click
    },

    getInitialState: function() {
        return {
            selected: false
        };
    },

    render: function() {
        var class_name = '';
        if (this.state.selected) {
            class_name += ' selected ';
        }

        return (
            <li className={class_name} key={'home-bot-list-item' + this.props.bot.id} onClick={this._handle_click}>
                <img src={'static/' + this.props.bot.get('photo_url')} />
                {this.props.bot.get('name')}
            </li>
        );
    },

    get_id: function() {
        return this.props.bot.id;
    },

    selected: function() {
        return this.state.selected;
    },

    _handle_click: function() {
        this.setState({
            selected: !this.state.selected
        });
        this.props.on_click && this.props.on_click();
    }

});

module.exports = PickerListItem;
