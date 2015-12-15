var React = require('react');

var NavBar = require('./navBar.jsx');
var SessionModal = require('./sessionModal.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar/>
        <SessionModal/>
      </div>
    )
  }
});
