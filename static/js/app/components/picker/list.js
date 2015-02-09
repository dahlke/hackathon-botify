var React = require('react');
var _ = require('lodash');
var PickerListItem = require('app/components/picker/item');

var PickerList = React.createClass({

    propTypes: {
        //stream
        //bots
    },

    render: function() {
        var split_point = Math.floor(this.props.bots.size() / 3);
        var all_bots = {
            left: [],
            right: [],
            center: []
        };

        _.each(this.props.bots.models, function(bot, i) {
            var item = <PickerListItem bot={bot} ref={'bot-' + bot.id} num_selected={this.num_selected()} on_click={this._update}/>;
            if (i < split_point)  {
                all_bots.left.push(item);
            } else if (i < split_point * 2)  {
                all_bots.right.push(item);
            } else {
                all_bots.center.push(item);
            }
        }, this);

        return (
            <div className="picker-list">
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
                <div className="row button-row">
                    <button className="button-primary" onClick={this._goto_selected}>DEBATE ME</button>
                </div>
            </div>
        );
    },

    num_selected: function() {
        if (!this.isMounted()) {
            return 0;
        }

        return _.compact(_.map(this.refs, function(v, k) {
            return v.selected() ? v.get_id() : null;
        })).length;
    },

    _goto_selected: function() {
        var selected = _.compact(_.map(this.refs, function(v, k) {
            return v.selected() ? v.get_id() : null;
        }));

        Backbone.history.navigate('stream/' + selected.join(','), true);
    },

    _update: function() {
        if (this.isMounted()) {
            this.forceUpdate();
        }
    }


});

module.exports = PickerList;
