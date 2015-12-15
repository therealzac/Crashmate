var React = require('react');

var NavBar = require('./navBar.jsx');
var SignInModal = require('./signInModal.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar/>
        <SignInModal/>
      </div>
    )
  }
});
