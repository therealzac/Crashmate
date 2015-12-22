var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');
var FilterStore = require('../stores/filters.js');
var RoommateStore = require('../stores/roommates.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FilterBar = require('./filterBar.jsx');
var IndexItem = require('./indexItem.jsx');


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    filters = FilterStore.getFilters();
    roommates = RoommateStore.getRoommates();
    return {filters: filters, roommates: roommates}
  },

  componentDidMount: function () {
    this.filterListener = FilterStore.addListener(this._onChange);
    this.roommateListener = RoommateStore.addListener(this._onChange);
  },

  _onChange: function () {
    filters = FilterStore.getFilters();
    roommates = RoommateStore.getRoommates();
    this.setState({filters: filters, roommates: roommates});
  },

  filteredRoommates: function () {
    var all = this.state.roommates;

    var minAge = this.state.filters.ageRange[0];
    var maxAge = this.state.filters.ageRange[1];
    var correctAge = all.filter(function (x) {
      return (x.age >= minAge && x.age <= maxAge)
    });

    var minBudget = this.state.filters.budget;
    var correctBudget = correctAge.filter(function (x) {
      return (x.budget >= minBudget)
    });

    if (this.state.filters.cats) {
      var correctCats = correctBudget;
    } else {
      var correctCats = correctBudget.filter(function (x) {
        return (!x.cats)
      });
    }

    if (this.state.filters.dogs) {
      var correctDogs = correctCats;
    } else {
      var correctDogs = correctCats.filter(function (x) {
        return (!x.dogs)
      });
    }

    var genderPreference = this.state.filters.gender;
    if (genderPreference === "Both") {
      var correctGender = correctDogs;
    } else {
      var correctGender = correctDogs.filter(function (x) {
        return (x.gender === genderPreference)
      });
    }

    var occupationPreference = this.state.filters.occupation;
    if (occupationPreference === "Both") {
      var correctOccupation = correctGender;
    } else {
      var correctOccupation = correctGender.filter(function (x) {
        return (x.occupation === occupationPreference)
      });
    }

    var minTerm = this.state.filters.term;
    var correctTerm = correctOccupation.filter(function (x) {
      return (x.term >= minTerm)
    });

    var minDate = new Date(this.state.filters.date);
    var correctDate = correctTerm.filter(function(x){
      var thisDate = new Date(x.date)
      return(thisDate <= minDate)
    });

    return correctDate;
  },

  render: function () {
    return(
      <main className="index group">
        <FilterBar/>
        <section className="index-main">
          <h2>Roommates in {this.state.filters.city}</h2>
          <ul>
            {this.filteredRoommates().map(function (roommate) {
              return (
                  <IndexItem key={roommate.id}
                                  id={roommate.id}
                                  name={roommate.username}
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
