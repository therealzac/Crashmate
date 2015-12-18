var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FilterStore = require('../stores/filters.js');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var filters = FilterStore.getFilters();
    return { city: "", placeholder: "Where are you moving?" }
  },

  componentDidMount: function () {
    this.filterListener = FilterStore.addListener(this._onChange);
    ApiUtil.fetchCity();
  },

  _onChange: function () {
    this.setState({placeholder: FilterStore.getFilters().city});
  },

  componentWillUnmount: function () {
    this.filterListener.remove();
  },

  handleButton: function (event) {
    event.preventDefault();
    if (this.state.city !== "") {
      ApiActions.setFilter({city: this.state.city});
      this.props.history.push("index");
    } else if (this.state.placeholder !== "Where are you moving?"){
      ApiActions.setFilter({city: this.state.placeholder});
      this.props.history.push("index");
    }
  },

  render: function () {
    return(
      <main className="content group">
        <section className="content-main">
          <div className="city-input">
            <input type="text"
                   valueLink={this.linkState("city")}
                   placeholder={this.state.placeholder}
            />
            <div className="city-submit">
              <button onClick={this.handleButton}>Find Roommates</button>
            </div>
          </div>
        </section>
      </main>
    )
  }
})
