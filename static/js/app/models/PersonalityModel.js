var Backbone = require('backbone');

var ScriptModel = Backbone.Model.extend({
    url: 'script',
    idAttribute: 'name'
});

module.exports = ScriptModel;
