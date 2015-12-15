var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { username: "", password: "", modalOpen: false }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    session = SessionStore.getSession();
    this.setState({ modalOpen: session.modalOpen })
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleLogIn: function () {
    var user = {username: this.state.username, password: this.state.password}
    ApiUtil.logIn(user);
    this.setState({modalOpen: false});
  },

  handleSignUp: function (event) {
    var user = {username: this.state.username, password: this.state.password}
    ApiUtil.createUser(user);
    this.setState({modalOpen: false});
  },

  handleClose: function () {
    this.setState({modalOpen: false});
  },

  render: function () {
    var out;
    if (!this.state.modalOpen){
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
