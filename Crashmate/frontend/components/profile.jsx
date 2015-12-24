var React = require('react');
var SessionStore = require('../stores/session.js');
var RoommatesStore = require('../stores/roommates.js');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');
var Messenger = require('./messengerModal.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    return SessionStore.getSession();
  },

  componentDidMount: function () {
    this.roommatesListener = RoommatesStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);

    ApiActions.renderOpaque();
    ApiUtil.fetchUsers();
  },

  _onChange: function () {
    roommates = RoommatesStore.getRoommates();
    id = parseInt(this.props.params.id)

    currentProfile = roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    if (currentProfile[0]){
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
        city: currentProfile[0].city,
        amenities: currentProfile[0].amenities
      });
    }
  },

  componentWillReceiveProps: function (newProps) {
    id = parseInt(newProps.params.id)

    currentProfile = roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    if (currentProfile[0]){
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
        city: currentProfile[0].city,
        amenities: currentProfile[0].amenities
      });
    }
  },

  componentWillUnmount: function () {
    this.roommatesListener.remove();
    this.sessionListener.remove();
  },

  openMessenger: function () {
    ApiActions.renderMessenger();
  },

  listPets: function () {
    var pets = [];
    if (this.state.dogs) { pets.push("dogs")}
    if (this.state.cats) { pets.push("cats")}
    if ( pets.length === 0 ) { return "no pets" };
    return pets.join(" and ");
  },

  render: function () {
    return(
      <main className="show group">
      <Messenger profileId={this.props.params.id}/>
        <header className="show-header">
          <h1>{this.state.username}</h1>
            <p>{this.state.age}, {this.state.gender}</p>
            <p>Available by {this.state.date}</p>
          <button onClick={this.openMessenger}
                  className="show-header-message-button">
                  Message
          </button>
        </header>
        <section className="show-sidebar">
          <a href="#" className="profile-picture">
            <img src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"/>
          </a>

          <div className="profile-info">
            <p>{this.state.about}</p>
          </div>

          <ul className="profile-nav">
            <li>Looking in {this.state.city}.</li>
            <li>Occupation: {this.state.occupation}</li>
            <li>Amenities required: {this.state.amenities}</li>
            <li>Can spend ${this.state.budget} on rent per month.</li>
            <li>Can commit to {this.state.term} months.</li>
            <li>Has { this.listPets() }.</li>
          </ul>
        </section>
        <section className="show-main">
          <h2>{this.state.username}'s Crashmates</h2>
          <div className='crashmates'/>
          <h2>Places {this.state.username} Likes</h2>
          <div className='properties'/>
        </section>
      </main>
    )
  }
});

module.exports = Profile;
