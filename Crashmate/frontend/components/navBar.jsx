var React = require('react');
var SessionStore = require('../stores/session.js');
var RoommatesStore = require('../stores/roommates.js');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');
var History = require('react-router').History;
var MessageModal = require('./messageModal.jsx');


var Navbar = module.exports = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var roommates = RoommatesStore.getRoommates();
    var session = SessionStore.getSession();
    var messages = session.messages;

    return {session: session, roommates: roommates, messages: messages}
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    ApiUtil.fetchSession();
    ApiUtil.fetchUsers();
  },

  _onChange: function () {
    var roommates = RoommatesStore.getRoommates();
    var session = SessionStore.getSession();
    var messages = session.messages;
    this.setState({session: session, messages: messages, roommates: roommates});
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleClick: function (event) {
    event.preventDefault;
    if (event.currentTarget.innerHTML === 'Log Out') {

      ApiUtil.logOut();
      this.props.history.push('/');

    } else if (event.currentTarget.innerHTML === this.state.session.username) {

      var userUrl = "/users/" + this.state.session.id;
      this.props.history.pushState(null, userUrl, {id: this.state.session.id});
      ApiActions.renderOpaque();

    } else if (event.currentTarget.innerHTML === 'Log In'){

      ApiActions.renderLogInModal();

    } else if (event.currentTarget.innerHTML === 'Sign Up'){

      this.props.history.push('/');
      ApiActions.renderSignUpModal();
      ApiUtil.fetchUsers();

    } else if (event.currentTarget.innerHTML === 'Crashmate'){

      this.props.history.push('/');

    }
  },

  getSender: function (id) {
    sender = this.state.roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    return sender[0].username;
  },

  showMessage: function (event) {
    event.preventDefault;

    id = parseInt(event.currentTarget.id);
    message = this.state.messages.filter(function (message) {
      return (message.id === id)
    });
    ApiActions.renderMessage(message[0]);
  },

  render: function () {
    var self = this;
    var username = this.state.session.username;
    var toggle = "Log Out";
    var messageClass = "";
    if (typeof this.state.session.id === "undefined" || username === "") {
      username = "Sign Up";
      toggle = "Log In";
      messageClass = "hidden";
    };
    var sender_id = this.state.sender_id;
    if (this.state.messages.length < 1) {messageClass = "hidden"}

    return (
      <header className={this.state.session.navBar}>
        <MessageModal history={this.props.history}/>
        <nav className="header-nav group">

          <h1 className="header-logo" onClick={this.handleClick}>Crashmate</h1>

          <ul className="header-list group">
                <li className={messageClass}>
                  Messages <strong className="badge">
                    {this.state.messages.length}
                  </strong>
                  <ul className="header-notifications">
                    {this.state.messages.map(function (message, index) {
                      return (
                        <li key={index}
                            onClick={self.showMessage}
                            id={message.id}>
                            {self.getSender(message.sender_id)} sent you a {message.type}.
                        </li>
                      )
                    })}
                  </ul>
                </li>
            <li onClick={this.handleClick}>{username}</li>
            <li onClick={this.handleClick}>{toggle}</li>
          </ul>
        </nav>
      </header>
    )
  }
});
