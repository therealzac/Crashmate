var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { username: "", password: "", isClosed: false }
  },

  handleLogIn: function () {
    var user = {username: this.state.username, password: this.state.password}
    ApiUtil.logIn(user);
    this.setState({isClosed: true});
  },

  handleSignUp: function (event) {
    var user = {username: this.state.username, password: this.state.password}
    ApiUtil.createUser(user);
    this.setState({isClosed: true});
  },

  handleClose: function () {
    this.setState({isClosed: true});
  },

  render: function () {
    var out;
    if (this.state.isClosed){
      return (<div/>);
    } else {
      return(
        <div className="modal is-open">
          <form className="modal-form">

            <span className="modal-close js-modal-close" onClick={this.handleClose}>
              &times;
            </span>

            <h1>Welcome to Crashmate</h1>

            <p>Please log in or sign up.</p>

            <div className="input">
              <label for="form-email">Username</label>
              <input type="text" id="form-email"
                     valueLink={this.linkState("username")}>
              </input>
            </div>

            <div className="input">
              <label for="form-password">Password</label>
              <input type="password" id="form-password"
                     valueLink={this.linkState("password")}>
              </input>
            </div>

            <div className="submit">
              <button onClick={this.handleLogIn}>Log In</button>
              <span className="button-alternative">or <strong className="button"
                                                        onClick={this.handleSignUp}>
                                                        Sign Up
                                                      </strong>
              </span>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});
