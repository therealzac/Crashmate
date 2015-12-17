var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FilterStore = require('../stores/filters.js');
var ApiActions = require('../actions/apiActions.js');


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { city: "", placeholder: "Where are you moving?" }
  },

  handleButton: function (event) {
    event.preventDefault();
    if (this.state.city === "") {
      this.setState({placeholder: "Please enter a city to search."})
    } else {
      ApiActions.setFilter({city: this.state.city});
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
