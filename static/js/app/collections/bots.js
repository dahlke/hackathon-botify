var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
var BotModel = require('app/models/bot');

var Bots = Backbone.Collection.extend({

    last_updated: 0,

    model: BotModel,

    initialize: function(models, options) {
        this.populate();
    },

    populate: function() {
        $.ajax({
            url: 'http://debateabot.com/api/bot/query',
            type: 'POST',
            success: function(data) {
                this.set(data);
            }.bind(this),
            error: function(e) {
                console.log('Unexpected error occured while populating bots:', e);
            }
        });
    }

});

// sort on last updated

module.exports = Bots;
