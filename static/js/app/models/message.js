var Backbone = require('backbone');

var Message = Backbone.Model.extend({
    idAttribute: 'message_id'
});

module.exports = Message;
