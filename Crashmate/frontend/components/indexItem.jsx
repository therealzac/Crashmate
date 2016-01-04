var React = require('react');
var History = require('react-router').History;
var Faker = require('faker');

module.exports = React.createClass({
  mixins: [History],

  showProfile: function () {
    var userUrl = "/users/" + this.props.id;
    this.history.push(userUrl);
  },

  render: function () {
    if (this.props.profile_pic){
      var picture_url = this.props.profile_pic;
    } else {
      var picture_url = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";
    }

    return(
      <ul onClick={this.showProfile} className="index-item">
          <img className="profile-picture" src={picture_url}/>
          <li className="index-item-detail">{this.props.name}</li>
          <li className="index-item-detail">Age: {this.props.age}</li>
          <li className="index-item-detail">Budget: ${this.props.totalBudget}</li>
      </ul>
    );
  }
});
