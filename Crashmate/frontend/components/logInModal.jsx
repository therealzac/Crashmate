var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');
var SessionStore = require('../stores/session.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  resetState: {
    username: "",
    password: "",
    logInModalOpen: false,
    message: "Welcome back.",
    loggingIn: false
  },

  getInitialState: function () {
    return this.resetState;
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    session = SessionStore.getSession();
    this.setState(session);
    if (this.state.id && this.state.loggingIn){
      var userUrl = "/users/" + this.state.id;
      this.props.history.push(userUrl);
      this.setState(this.resetState)
    }
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleButton: function (event) {
    event.preventDefault();
    var user = {username: this.state.username, password: this.state.password}
    ApiUtil.logIn(user);
    this.setState({loggingIn: true});
  },

  handleClose: function () {
    ApiActions.closeModals();
  },

  render: function () {
    if (!this.state.logInModalOpen){
      return (<div/>);
    } else {
      return(
      <div className="modal is-open">
        <form className="modal-form">

          <span className="modal-close js-modal-close" onClick={this.handleClose}>
            &times;
          </span>

          <h1>Crashmate</h1>

          <p>{this.state.message}</p>

          <div className="input">
            <label>Username</label>
            <input type="text" valueLink={this.linkState("username")}/>
          </div>

          <div className="input">
            <label>Password</label>
            <input type="password" valueLink={this.linkState("password")}/>
          </div>

          <div className="submit">
            <button onClick={this.handleButton}>Log In</button>
          </div>

        </form>
        <div className="modal-screen js-modal-close"></div>
      </div>
      )
    }
  }
});
