var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  resetState: {
    username: "",
    password: "",
    modalOpen: false,
    message: "",
    buttonValue: ""
  },

  getInitialState: function () {
    return { username: "", password: "", modalOpen: false, message: "",
             buttonValue: "" }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    session = SessionStore.getSession();
    this.setState({ modalOpen: session.modalOpen, buttonValue: session.buttonValue,
                    message: session.messageValue })
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleButton: function (event) {
    var user = {username: this.state.username, password: this.state.password}
    if (event.currentTarget.innerHTML === "Sign Up"){
      this.setState(this.resetState);
      ApiUtil.createUser(user);
    } else {
      this.setState(this.resetState);
      ApiUtil.logIn(user);
    }
  },

  handleClose: function () {
    this.setState({ username: "", password: "", modalOpen: false });
  },

  render: function () {
    if (!this.state.modalOpen){
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
              <button onClick={this.handleButton}>{this.state.buttonValue}</button>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});
