var React = require('react');
var SessionStore = require('../stores/session.js');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  getInitialState: function () {
    return { session: SessionStore.getSession() }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ session: SessionStore.getSession() });
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleClick: function (event) {
    console.log(event.currentTarget.innerHTML);
    if (event.currentTarget.innerHTML === 'Log Out') {
      ApiUtil.logOut();
    }
  },

  render: function () {
    var username = this.state.session.username;
    var toggle = "Log Out"
    var hideNotifications = ""
    if (typeof username === 'undefined') {
      username = "Sign Up";
      toggle = "Log In";
      hideNotifications = "hidden"
    }
    return (
      <header className="header">
        <nav className="header-nav group">

          <h1 className="header-logo">Crashmate</h1>

          <ul className="header-list group">
                <li className={hideNotifications}>
                  Notifications <strong className="badge">3</strong>
                  <ul className="header-notifications">
                    <li><a href="#">Example...</a></li>
                    <li><a href="#">Example...</a></li>
                    <li><a href="#">Example...</a></li>
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
