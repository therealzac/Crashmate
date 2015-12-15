var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {

  },
  
  render: function () {
    return (
      <header className="header">
        <nav className="header-nav group">

          <h1 className="header-logo">Crashmate</h1>

          <ul className="header-list group">
                <li>
                  Notifications <strong className="badge">3</strong>
                  <ul className="header-notifications">
                    <li><a href="#">Example...</a></li>
                    <li><a href="#">Example...</a></li>
                    <li><a href="#">Example...</a></li>
                  </ul>
                </li>
            <li>Profile</li>
            <li>Settings</li>
          </ul>
        </nav>
      </header>
    )
  }
});
