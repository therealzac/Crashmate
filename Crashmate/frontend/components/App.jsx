var React = require('react');
var NavBar = require('./navBar.jsx');
var SessionModal = require('./sessionModal.jsx');
var Splash = require('./splash.jsx');
var Index = require('./index.jsx');
var Footer = require('./footer.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar history={this.props.history}/>
        <SessionModal/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
});
