var React = require('react');
var SessionStore = require('../stores/session.js');

module.exports = React.createClass({
  getInitialState: function () {
    return SessionStore.getSession();
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState(SessionStore.getSession());
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  render: function () {
    return(
      <main className="show group">
        <header className="show-header">
          <h1>{this.state.username}</h1>
            <p>25, male</p>
            <p>Available by 1/16/2016</p>
          <button className="show-header-message-button">Message</button>
        </header>
        <section className="show-sidebar">
          <a href="#" className="profile-picture">
            <img src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"/>
          </a>

          <div className="profile-info">
            <p>This will be information contained by this.state.about</p>
          </div>

          <ul className="profile-nav">
            <li>Budget</li>
            <li>Minimum Months</li>
            <li>Occupation</li>
            <li>Pets</li>
          </ul>
        </section>
        <section className="show-main">
          <h2>{this.state.username}'s Crashmates</h2>
          <h2>Places {this.state.username} Likes</h2>
        </section>
      </main>
    )
  }
});
