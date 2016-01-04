var React = require('react');
var SessionStore = require('../stores/session.js');
var RoommatesStore = require('../stores/roommates.js');
var FilterStore = require('../stores/filters.js');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');
var Messenger = require('./messengerModal.jsx');
var EditModal = require('./editModal.jsx');
var IndexItem = require('./indexItem.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    var roommates = RoommatesStore.getRoommates();
    var session = SessionStore.getSession();
    var filters = FilterStore.getFilters();
    city = (filters.city ? filters.city : session.city);
    return {session: SessionStore.getSession(), city: city, buttonValue: "Message"}
  },

  componentDidMount: function () {
    this.roommatesListener = RoommatesStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.filterListener = FilterStore.addListener(this._onChange);

    ApiActions.renderOpaque();
    ApiUtil.fetchUsers();
  },

  _onChange: function () {
    var roommates = RoommatesStore.getRoommates();
    var session = SessionStore.getSession();
    var filters = FilterStore.getFilters();
    var id = parseInt(this.props.params.id);


    currentProfile = roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    if (session.id === id){
      this.setState({buttonValue: "Edit Profile", city: session.city});
    } else {
      this.setState({buttonValue: "Message"})
    }

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
        amenities: currentProfile[0].amenities,
        group_id: currentProfile[0].group_id,
        profile_pic: currentProfile[0].profile_pic,
        session: session
      });
    }

    if (filters.city){
      this.setState({city: filters.city});
    } else if (currentProfile[0]) {
      this.setState({city: currentProfile[0].city});
    }
  },

  componentWillReceiveProps: function (newProps) {
    id = parseInt(newProps.params.id)

    currentProfile = roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    if (this.state.session.id === id){
      this.setState({buttonValue: "Edit Profile"});
    } else {
      this.setState({buttonValue: "Message"})
    }

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
        amenities: currentProfile[0].amenities,
        group_id: currentProfile[0].group_id,
        profile_pic: currentProfile[0].profile_pic,
        session: SessionStore.getSession()
      });
    }
  },

  componentWillUnmount: function () {
    this.roommatesListener.remove();
    this.sessionListener.remove();
    this.filterListener.remove();
  },

  handleButton: function (event) {
    if (event.currentTarget.innerHTML === "Edit Profile"){
      ApiActions.renderEdit();
    } else if ( this.state.session.id ){
      ApiActions.renderMessenger();
    } else {
      ApiActions.requireLogIn();
    }
  },

  listPets: function () {
    var pets = [];
    if (this.state.dogs) { pets.push("dogs")}
    if (this.state.cats) { pets.push("cats")}
    if ( pets.length === 0 ) { return "no pets" };
    return pets.join(" and ");
  },

  getRoommates: function () {
    if (!this.state.group_id){ return [] }

    self = this;
    var all = RoommatesStore.getRoommates();
    var roommates = all.filter(function(roommate){
      return (roommate.group_id === self.state.group_id)
    });

    var withoutSelf = roommates.filter(function (roommate) {
      return (roommate.id !== self.state.id)
    });

    return withoutSelf;
  },

  render: function () {
    if (this.state.profile_pic){
      var picture_url = this.state.profile_pic;
    } else {
      var picture_url = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";
    }

    return(
      <main className="show group">
        <Messenger profileId={this.props.params.id}/>
        <EditModal/>

        <header className="show-header">
          <h1>{this.state.username}</h1>
            <p>{this.state.age}, {this.state.gender}</p>
            <p>Available by {this.state.date}</p>
          <button onClick={this.handleButton}
                  className="show-header-message-button">
                  {this.state.buttonValue}
          </button>
        </header>
        <section className="show-sidebar">
          <a href="#" className="profile-picture">
            <img src={picture_url}/>
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
          <ul className='crashmates'>
            {this.getRoommates().map(function (roommate){
              return (
                <IndexItem key={roommate.id}
                           id={roommate.id}
                           name={roommate.username}
                           age={roommate.age}
                           totalBudget={roommate.budget}
                           profile_pic={roommate.profile_pic}
                  />
                );
              })
            }
          </ul>
        </section>
      </main>
    )
  }
});

module.exports = Profile;
