var React = require('react');

var NavBar = require('./navBar.jsx');
var SessionModal = require('./sessionModal.jsx');
var Splash = require('./splash.jsx');
var Footer = require('./footer.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar/>
        <SessionModal/>
        <Splash/>
        <Footer/>
      </div>
    )
  }
});
