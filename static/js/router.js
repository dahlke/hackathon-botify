var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Header = require('app/components/header');
var StreamPage = require('app/pages/stream');
var HomePage = require('app/pages/home');
var Stream = require('app/collections/stream');
var Bots = require('app/collections/bots');
var header_container = $('#header-container')[0];
var container = $('#container')[0];

$(document).on('click', 'a.rewrite', function(e) {
    if (e.which === 2 || e.ctrlKey || e.metaKey) { return; }


    var self = $(this);
    var href = self.attr('href');
    Backbone.history.navigate(href, true);
    e.preventDefault();
    return false;
});

var BOTS = new Bots();

var Router = Backbone.Router.extend({

    routes: {
        '': 'home',
        'stream/:bot_ids': 'stream'
    },

    initialize: function() {
        Backbone.history.start();

        this._header = <Header bots={BOTS} />;
        React.render(this._header, header_container);
    },

    home: function() {
        this._home = <HomePage bots={BOTS} />;
        React.render(this._home, container);
    },

    stream: function(bot_ids) {
        var stream = new Stream(undefined, {bot_ids: bot_ids.split(',')});
        this._stream = <StreamPage stream={stream} bots={BOTS} />;
        React.render(this._stream, container);
    }

});

var router = window.router = new Router();
window.Backbone = Backbone;

module.exports = router;
