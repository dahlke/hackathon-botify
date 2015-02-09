var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var MessageModel = require('app/models/message');

var Stream = Backbone.Collection.extend({

    last_updated: 0,

    model: MessageModel,

    comparator: 'updated',

    bots: {},

    initialize: function(models, options) {
        this._create();
        this.bot_ids = _.map(options.bot_ids, function(id) { return parseInt(id); });
    },

    ping: function(stream) {
        $.ajax({
            url: 'http://debateabot.com/api/stream/ping',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                stream_id: this.stream_id
            }),
            success: function(data) {
                console.log('ping!');
            },
            error: function(e) {
                console.log('Unexpected error occured:', e);
            }
        });
    },

    append: function(text) {
        $.ajax({
            url: 'http://debateabot.com/api/stream/append',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                stream_id: this.stream_id,
                text: text
            }),
            success: function(data) {
                console.log('turn from opaque to solid', data);
            },
            error: function(e) {
                console.log('Unexpected error occured while appending the message:', e);
            }
        });
    },

    query: function() {
        if (!this.stream_id) {
            return;
        }

        $.ajax({
            url: 'http://debateabot.com/api/stream/query',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                stream_id: this.stream_id,
                updated_since: this._last_updated()
            }),
            success: function(data) {
                this.set(data, {remove: false});
                this.trigger('change');
            }.bind(this),
            error: function(e) {
                console.log('Unexpected error occured while adding the bot:', e);
            }
        });
    },

    add_bot: function(bot_id) {
        $.ajax({
            url: 'http://debateabot.com/api/stream/add_bot',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                stream_id: this.stream_id,
                bot_id: parseInt(bot_id)
            }),
            success: function(data) {
                this.bots[String(bot_id)] = true;
                this.trigger('change');
            }.bind(this),
            error: function(e) {
                console.log('Unexpected error occured while adding the bot:', e);
            }
        });
    },

    remove_bot: function(bot_id) {
        $.ajax({
            url: 'http://debateabot.com/api/stream/remove_bot',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                stream_id: this.stream_id,
                bot_id: bot_id
            }),
            success: function(data) {
                delete this.bots[String(bot_id)];
                this.trigger('change');
            }.bind(this),
            error: function(e) {
                console.log('Unexpected error occured while removing the bot:', e);
            }
        });
    },

    _create: function() {
        $.ajax({
            url: 'http://debateabot.com/api/stream/create',
            type: 'POST',
            success: function(data) {
                this.stream_id = data.stream_id;
                this._init_bots();
            }.bind(this),
            error: function(e) {
                console.log('Unexpected error occured while creating stream:', e);
            }
        });
    },

    _init_bots: function() {
        _.each(this.bot_ids, function(bot_id) {
            this.add_bot(bot_id);
        }, this);
    },

    _last_updated: function() {
        return _.max( _.map(this.models, function(m) {
            return m.get('updated');
        })) || 0;
    }

});

// sort on last updated

module.exports = Stream;
