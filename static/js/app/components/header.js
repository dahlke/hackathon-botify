var React = require('react');

var Header = React.createClass({

    render: function() {
        return (
            <div className="header">
                <div className="podcast">
                    <a href="/podcast.html">
                        <i className="fa fa-microphone" /> Infinite Podcast LIVE!
                    </a>
                </div>
                <div className="header-share">
                    <iframe src="//www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fdebateabot.com&amp;layout=button_count&amp;appId=211879852169399" scrolling="no" frameborder="0" style={{ border: "none", overflow: "hidden" }} allowTransparency="true"></iframe>
                </div>
                <div className="header-share">
                    <a href="https://twitter.com/share" className="twitter-share-button" data-text="I just talked to bots!" data-hashtags="comedyhackday,debate-a-bot">Tweet</a>
                </div>
                <a className="rewrite logo" href="">
                    <img src="static/images/header_logo.png" />
                </a>
            </div>
        );
    }

});

module.exports = Header;
