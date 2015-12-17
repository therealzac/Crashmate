var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var FilterStore = require('../stores/filters.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Slider = require('react-nouislider');
var Calendar = require('react-input-calendar');

Date.prototype.parseDate = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString();
  var dd  = this.getDate().toString();
  return (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]) + "-" + yyyy;
 };

today = new Date().parseDate();

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return FilterStore.getFilters();
  },

  componentDidMount: function () {
    this.filterListener = FilterStore.addListener(this._onChange);

  },

  _onChange: function () {
    this.setState(FilterStore.getFilters());
  },

  ageChange: function (ages) {
    ages = ages.map(function(age){
      return parseInt(age);
    });

    ApiActions.setFilter({ageRange: ages});
  },

  budgetChange: function (budget) {
    ApiActions.setFilter({budget: parseInt(budget)});
  },

  termChange: function (term) {
    ApiActions.setFilter({term: parseInt(term)});
  },

  dateChange: function (date) {
    ApiActions.setFilter({date: date})
  },

  render: function () {

    return(
      <main className="index group">
        <section className="index-filters">

          <label className="filter-label">Age</label>
          <div className="filter-component">
            <Slider range={{min: 18, max: 65}}
                    start={this.state.ageRange}
                    step={1}
                    connect={true}
                    tooltips
                    onChange={this.ageChange}
            />
          </div>

          <label className="filter-label">Monthly Budget</label>
          <div className="filter-component">
            <Slider range={{min: 100, max: 10000}}
                    start={[this.state.budget]}
                    connect="lower"
                    step={50}
                    tooltips
                    onChange={this.budgetChange}
            />
          </div>

          <label className="filter-label">Minimum Stay</label>
          <div className="filter-component">
            <Slider range={{min: 1, max: 12}}
                    start={[this.state.term]}
                    connect={"lower"}
                    step={1}
                    tooltips
                    onChange={this.termChange}
            />
          </div>

          <label className="filter-label">Available to move by:</label>
          <div className="filter-component">
            <Calendar format="DD/MM/YYYY"
                      date={today}
                      onChange={this.dateChange}
            />
          </div>
        </section>
          <section className="index-main">
        </section>
      </main>
    )
  }
});
