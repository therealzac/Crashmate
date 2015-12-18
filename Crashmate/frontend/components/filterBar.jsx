var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var FilterStore = require('../stores/filters.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Slider = require('react-nouislider');
var Calendar = require('react-input-calendar');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

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

  componentWillUnmount: function () {
    this.filterListener.remove();
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

  groupChange: function (groupSize) {
    ApiActions.setFilter({groupSize: parseInt(groupSize)});
  },

  termChange: function (term) {
    ApiActions.setFilter({term: parseInt(term)});
  },

  dateChange: function (date) {
    ApiActions.setFilter({date: date})
  },

  selectGender: function (event) {
    event.preventDefault;
    var gender = event.currentTarget.innerHTML;
    if (gender === this.state.gender) {
      ApiActions.setFilter({gender: "Both"});
    } else {
      ApiActions.setFilter({gender: gender});
    }
  },

  toggleCat: function (event) {
    event.preventDefault;
    newState = !this.state.cats;
    ApiActions.setFilter({cats: newState})
  },

  toggleDog: function (event) {
    event.preventDefault;
    newState = !this.state.dogs;
    ApiActions.setFilter({dogs: newState})
  },

  occupationChange: function (event) {
    event.preventDefault;
    var occupation = event.currentTarget.innerHTML;
    if (occupation === this.state.occupation) {
      ApiActions.setFilter({occupation: "Both"});
    } else {
      ApiActions.setFilter({occupation: occupation});
    }
  },


  render: function () {
    return(
        <section className="index-filters">

          <label className="filter-label">Can Move By</label>
          <div className="filter-component">
            <Calendar format="MM/DD/YYYY"
                      date={this.state.date}
                      onChange={this.dateChange}
            />
          </div>

          <label className="filter-label">Rent Budget</label>
          <div className="filter-component">
            <Slider range={{min: 100, max: 3000}}
                    start={[this.state.budget]}
                    connect="lower"
                    step={50}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.budgetChange}
            />
          </div>

          <label className="filter-label">Minimum Months</label>
          <div className="filter-component">
            <Slider range={{min: 1, max: 12}}
                    start={[this.state.term]}
                    connect={"lower"}
                    step={1}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.termChange}
            />
          </div>

          <label className="filter-label">Maximum Group Size</label>
          <div className="filter-component">
            <Slider range={{min: 2, max: 6}}
                    start={[this.state.groupSize]}
                    connect="lower"
                    step={1}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.groupChange}
            />
          </div>

          <label className="filter-label">Age</label>
          <div className="filter-component">
            <Slider range={{min: 18, max: 40}}
                    start={this.state.ageRange}
                    step={1}
                    connect={true}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.ageChange}
            />
          </div>

          <label className="filter-label">Gender</label>
          <div className="filter-component">
            <ButtonGroup>
              <Button onClick={this.selectGender}
                      active={this.state.gender === 'Male'}>
                      Male
              </Button>
              <Button onClick={this.selectGender}
                      active={this.state.gender === 'Female'}>
                      Female
              </Button>
            </ButtonGroup>
          </div>

          <label className="filter-label">Occupation</label>
          <div className="filter-component">
            <ButtonGroup>
              <Button onClick={this.occupationChange}
                      active={this.state.occupation === 'Student'}>
                      Student
              </Button>
              <Button onClick={this.occupationChange}
                      active={this.state.occupation === 'Professional'}>
                      Professional
              </Button>
            </ButtonGroup>
          </div>

          <label className="filter-label">Pets</label>
          <div className="filter-component">
            <ButtonGroup>
              <Button onClick={this.toggleCat}
                      active={this.state.cats}>
                      Cats
              </Button>
              <Button onClick={this.toggleDog}
                      active={this.state.dogs}>
                      Dogs
              </Button>
            </ButtonGroup>
          </div>
        </section>
    )
  }
});
