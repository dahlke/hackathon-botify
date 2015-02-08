var React = require('react');
var _ = require('lodash');

var Modal = React.createClass({

    render: function() {
        return (
            <div className="modal-container">
                <div className="modal-overlay" />
                <div className="modal-content">
                    <span className="modal-close" onClick={this._hide}>
                        <i className="fa fa-close" />
                    </span>
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = Modal;
