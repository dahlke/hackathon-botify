var Backbone = require('backbone');
var PersonalityModel = require('app/models/PersonalityModel');

var PersonalityCollection = Backbone.Collection.extend({
    url: '/personalities',
    model: PersonalityModel
});

module.exports = PersonalityCollection;
