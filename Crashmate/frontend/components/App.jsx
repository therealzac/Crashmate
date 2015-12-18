var React = require('react');
var NavBar = require('./navBar.jsx');
var LogInModal = require('./logInModal.jsx');
var SignUpModal = require('./signUpModal.jsx');
var Splash = require('./splash.jsx');
var Index = require('./index.jsx');
var Footer = require('./footer.jsx');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <NavBar history={this.props.history}/>
        <LogInModal history={this.props.history}/>
        <SignUpModal history={this.props.history}/>
        {this.props.children}
        <Footer/>
      </div>
    )
  }
});
