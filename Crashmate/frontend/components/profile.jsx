var React = require('react');
var SessionStore = require('../stores/session.js');
var RoommatesStore = require('../stores/roommates.js');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  getInitialState: function () {
    return {roommates: []}
  },

  componentDidMount: function () {
    this.roommatesListener = RoommatesStore.addListener(this._onChange);
    this.historyListener = this.props.history.listen(this._onChange);
    ApiUtil.fetchUsers();
  },

  _onChange: function () {
    roommates = RoommatesStore.getRoommates();
    id = parseInt(this.props.params.id)
    currentProfile = roommates.filter(function (x) {
      return (x.id === id)
    });

    this.setState({
      roommates: roommates,
      id: id,
      username: currentProfile[0].username,
      dogs: currentProfile[0].dogs,
      cats: currentProfile[0].cats,
      age: currentProfile[0].age,
      gender: currentProfile[0].gender,
      date: currentProfile[0].date,
      about: currentProfile[0].about,
      budget: currentProfile[0].budget,
      term: currentProfile[0].term,
      occupation: currentProfile[0].occupation,
      city: currentProfile[0].city
    });
  },

  componentWillUnmount: function () {
    this.roommatesListener.remove();
  },

  listPets: function () {
    var pets = [];
    if (this.state.dogs) { pets.push("dogs")}
    if (this.state.cats) { pets.push("cats")}
    if (pets = []) { return "none" };
    return pets.join(" and ");
  },

  render: function () {
    return(
      <main className="show group">
        <header className="show-header">
          <h1>{this.state.username}</h1>
            <p>{this.state.age}, {this.state.gender}</p>
            <p>Available by {this.state.date}</p>
          <button className="show-header-message-button">Message</button>
        </header>
        <section className="show-sidebar">
          <a href="#" className="profile-picture">
            <img src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"/>
          </a>

          <div className="profile-info">
            <p>{this.state.about}</p>
          </div>

          <ul className="profile-nav">
            <li>Budget: {this.state.budget}</li>
            <li>Minimum Months: {this.state.term}</li>
            <li>Occupation: {this.state.occupation}</li>
            <li>Pets: { this.listPets() }</li>
            <li>Looking in: {this.state.city}</li>
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
