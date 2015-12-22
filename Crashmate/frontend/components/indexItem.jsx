var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  showProfile: function () {
    var userUrl = "/users/" + this.props.id;
    this.history.push(userUrl);
  },

  render: function () {
    return(
      <li onClick={this.showProfile} className="index-item">
          <img className="profile-picture" src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"/>
          <span className="index-item-detail">{this.props.name}</span>
          <span className="index-item-detail">Age: {this.props.age}</span>
          <span className="index-item-detail">Total Budget: ${this.props.totalBudget}</span>
      </li>
    );
  }
});
