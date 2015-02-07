var Backbone = require('backbone');
var React = require('react');
var State = require('app/models/state');

var IndexPage = React.createClass({

    render: function() {
        return (
            <div className="home-page">
                Hello, World!
            </div>
        );
    }

});

return IndexPage;
