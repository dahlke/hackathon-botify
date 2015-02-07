var Backbone = require('backbone');

var PersonalityModel = Backbone.Model.extend({
    url: 'personality'
});

module.exports = PersonalityModel;
