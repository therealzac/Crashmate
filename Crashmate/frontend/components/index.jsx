var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var FilterStore = require('../stores/filters.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var noUISlider = require('react-nouislider');

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

  onSet: function (event) {
    console.log(event);
  },

  render: function () {
    return(
      <main className="index group">
        <section className="index-filters">
          <label className="filter-label">Age</label>
          <div className="age-slider">
            <Slider range={{min: 18, max: 65}}
                    start={[18, 65]}
                    tooltips
            />
          </div>
        </section>
          <section className="index-main">
        </section>
      </main>
    )
  }
});
