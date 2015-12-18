var React = require('react');
var ApiActions = require('../actions/apiActions.js');
var FilterStore = require('../stores/filters.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FilterBar = require('./filterBar.jsx');


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

  render: function () {
    return(
      <main className="index group">
        <FilterBar/>
        <section className="index-main">
          <h2>Roommates in {this.state.city}</h2>
        </section>
      </main>
    )
  }
});
