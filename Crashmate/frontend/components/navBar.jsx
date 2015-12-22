var React = require('react');
var SessionStore = require('../stores/session.js');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');

module.exports = React.createClass({
  getInitialState: function () {
    return {session: SessionStore.getSession()}
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    ApiUtil.fetchSession();
    ApiUtil.fetchUsers();
    ApiUtil.fetchCity();
  },

  _onChange: function () {
    this.setState({session: SessionStore.getSession()});
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleClick: function (event) {
    if (event.currentTarget.innerHTML === 'Log Out') {
      ApiUtil.logOut();
      this.props.history.push('/');
      SessionStore.getSession();
    } else if (event.currentTarget.innerHTML === this.state.session.username) {
      var userUrl = "/users/" + this.state.session.id;
      this.props.history.push(userUrl);
    } else if (event.currentTarget.innerHTML === 'Log In'){
      ApiActions.renderLogInModal();
    } else if (event.currentTarget.innerHTML === 'Sign Up'){
      this.props.history.push('/');
      ApiActions.renderSignUpModal();
    } else if (event.currentTarget.innerHTML === 'Crashmate'){
      this.props.history.push('/');
    }
  },

  render: function () {
    var username = this.state.session.username;
    var toggle = "Log Out";
    var messageClass = "";
    if (typeof username === "undefined" || username === "") {
      username = "Sign Up";
      toggle = "Log In";
      messageClass = "hidden";
    };
    return (
      <header className="header">
        <nav className="header-nav group">

          <h1 className="header-logo" onClick={this.handleClick}>Crashmate</h1>

          <ul className="header-list group">
                <li className={messageClass}>
                  Messages <strong className="badge">3</strong>
                  <ul className="header-notifications">
                    <li>Example...</li>
                    <li>Example...</li>
                    <li>Example...</li>
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
