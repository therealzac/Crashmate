var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <footer className="footer group">

        <small className="footer-copy">
          &copy; Crashmate
        </small>

        <ul className="footer-links group">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>

    </footer>
    )
  }
})
