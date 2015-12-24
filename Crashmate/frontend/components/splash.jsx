var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/session.js');
var FilterStore = require('../stores/filters.js');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    session = SessionStore.getSession();
    placeholder = (session.city ? session.city : "Where are you moving?")
    return { city: "", placeholder: placeholder }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.filterListener = FilterStore.addListener(this._onChange);

    ApiActions.renderTransparent();
    ApiUtil.fetchCity();

    var input = (document.getElementById('pac-input'));
    this.autocomplete = new google.maps.places.Autocomplete(input);
  },

  _onChange: function () {
    if (this.state.placeholder === "Where are you moving?"){
      placeholder = SessionStore.getSession().city;
      if (typeof placeholder === 'undefined') {
        placeholder = FilterStore.getFilters().city;
      }
      if (typeof placeholder !== 'undefined') {
        return this.setState({placeholder: placeholder});
      }
    }
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.filterListener.remove();
  },

  handleButton: function (event) {
    event.preventDefault();
    var city = this.autocomplete.getPlace();

    if (typeof city !== "undefined") {city = city.formatted_address}
    else {city = this.state.city}

    if (city === "") {city = this.state.placeholder}

    if (city !== "Where are you moving?"){
      ApiActions.setFilter({city: city});
      this.props.history.push("index");
    }

  },

  render: function () {
    return(
      <main className="content group">
        <section className="content-main">
        <h1>Find Roommates Anywhere.</h1>
          <div className="city-input">
            <input id="pac-input"
                   type="text"
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
