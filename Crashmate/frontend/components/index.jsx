var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');
var FilterStore = require('../stores/filters.js');
var RoommateStore = require('../stores/roommates.js');
var SessionStore = require('../stores/session.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FilterBar = require('./filterBar.jsx');
var IndexItem = require('./indexItem.jsx');


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    filters = FilterStore.getFilters();
    roommates = RoommateStore.getRoommates();
    session = SessionStore.getSession();
    return {filters: filters, roommates: roommates, page: 0, city: session.city}
  },

  componentDidMount: function () {
    this.filterListener = FilterStore.addListener(this._onChange);
    this.roommateListener = RoommateStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
    ApiUtil.fetchCity();
    ApiActions.renderOpaque();
  },

  _onChange: function () {
    filters = FilterStore.getFilters();
    roommates = RoommateStore.getRoommates();
    session = SessionStore.getSession();

    city  = (session.city ? session.city : filters.city);
    this.setState({filters: filters, roommates: roommates, page: 0, city: city});

  },

  componentWillUnmount: function () {
    this.filterListener.remove();
    this.roommateListener.remove();
    this.sessionListener.remove();
  },

  filteredRoommates: function () {
    var all = this.state.roommates;

    var minAge = this.state.filters.ageRange[0];
    var maxAge = this.state.filters.ageRange[1];
    var correctAge = all.filter(function (roommate) {
      return (roommate.age >= minAge && roommate.age <= maxAge)
    });

    var minBudget = this.state.filters.budget;
    var correctBudget = correctAge.filter(function (roommate) {
      return (roommate.budget >= minBudget)
    });

    if (this.state.filters.cats) {
      var correctCats = correctBudget;
    } else {
      var correctCats = correctBudget.filter(function (roommate) {
        return (!roommate.cats)
      });
    }

    if (this.state.filters.dogs) {
      var correctDogs = correctCats;
    } else {
      var correctDogs = correctCats.filter(function (roommate) {
        return (!roommate.dogs)
      });
    }

    var genderPreference = this.state.filters.gender;
    if (genderPreference === "Both") {
      var correctGender = correctDogs;
    } else {
      var correctGender = correctDogs.filter(function (roommate) {
        return (roommate.gender === genderPreference)
      });
    }

    var occupationPreference = this.state.filters.occupation;
    if (occupationPreference === "Both") {
      var correctOccupation = correctGender;
    } else {
      var correctOccupation = correctGender.filter(function (roommate) {
        return (roommate.occupation === occupationPreference)
      });
    }

    var minTerm = this.state.filters.term;
    var correctTerm = correctOccupation.filter(function (roommate) {
      return (roommate.term >= minTerm)
    });

    var minDate = new Date(this.state.filters.date);
    var correctDate = correctTerm.filter(function(roommate){
      var thisDate = new Date(roommate.date)
      return (thisDate <= minDate)
    });

    var withoutSelf = correctDate.filter(function (roommate) {
      session = SessionStore.getSession();
      return (roommate.id !== session.id)
    });

    return withoutSelf;
  },

  render: function () {
    all = this.filteredRoommates();
    numPages = Math.floor(all.length / 12) + 1;
    thisPage = all.slice(this.state.page, this.state.page + 12);
    return(
      <main className="index group">
        <FilterBar/>
        <section className="index-main">
          <h2>Roommates in {this.state.city}</h2>
          <ul>
            {this.filteredRoommates().map(function (roommate) {
              return (
                  <IndexItem key={roommate.id}
                                  id={roommate.id}
                                  name={roommate.username}
                                  age={roommate.age}
                                  totalBudget={roommate.budget}
                  />
              )
            })}
          </ul>
        </section>
      </main>
    )
  }
});
