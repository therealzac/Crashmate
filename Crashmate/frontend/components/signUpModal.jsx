var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');
var SessionStore = require('../stores/session.js');
var FilterStore = require('../stores/filters.js');
var Slider = require('react-nouislider');
var Calendar = require('react-input-calendar');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;


module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  resetState: {
    signUpModalOpen: false,
    message: "Need a roommate? We got you.",
    header: "Crashmate",
    label: "",
    buttonValue: "Next",
    username: "",
    usernameInput: "input",
    password: "",
    passwordInput: "input",
    city: "",
    cityInput: "hidden",
    cityPlaceholder: "",
    calendarInput: "hidden",
    date: FilterStore.getFilters().date,
    budgetInput: "hidden",
    budget: 500,
    termInput: "hidden",
    term: 3,
    petInput: "hidden",
    dogs: false,
    cats: false,
    amenitiesInput: "hidden",
    amenities: "",
    aboutInput: "hidden",
    about: ""
  },

  getInitialState: function () {
    return this.resetState;
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.filtersListener = FilterStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      signUpModalOpen: SessionStore.getSession().signUpModalOpen,
      cityPlaceholder: FilterStore.getFilters().city
    });
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleButton: function (event) {
    event.preventDefault();
    this.nextMessage();
  },

  nextMessage: function () {
    if (this.state.label === ""){
      if (this.state.username === ""){
        this.setState({message: "What's your name?"});
        return;
      }
      if (this.state.password.length < 6){
        this.setState({message: "Your password must be at least 6 characters."});
        return;
      }

      newHeader = "Welcome, " + this.state.username + "!";
      this.setState({
        header: newHeader,
        message: "",
        label: "Where are you moving?",
        usernameInput: "hidden",
        passwordInput: "hidden",
        cityInput: "input"
      });

    } else if (this.state.label === "Where are you moving?"){
      if (this.state.city === ""){
        if (this.state.cityPlaceholder !== ""){
          this.setState({city: this.state.cityPlaceholder});
        } else {
          this.setState({
            label: "",
            message: "Please enter a city to continue."
          })
          this.nextMessage();
        }
      }

      this.setState({
        header: "Cool.",
        label: "When will you be available to move?",
        cityInput: "hidden",
        calendarInput: "signup-filter-label",
      });

    } else if (this.state.label === "When will you be available to move?"){

      this.setState({
        header: "Just a few more questions...",
        label: "What's your budget for rent?",
        calendarInput: "hidden",
        budgetInput: "signup-filter-label"
      });

    } else if (this.state.label === "What's your budget for rent?"){

      this.setState({
        header: "Just a few more questions...",
        label: "How many months can you commit to?",
        budgetInput: "hidden",
        termInput: "signup-filter-label"
      });

    } else if (this.state.label === "How many months can you commit to?"){

      this.setState({
        header: "Just a few more questions...",
        label: "Do you have any pets?",
        termInput: "hidden",
        petInput: "signup-filter-label"
      });

    } else if (this.state.label === "Do you have any pets?"){

      this.setState({
        header: "Just a few more questions...",
        label: "What amenities do you need at your new spot?",
        petInput: "hidden",
        amenitiesInput: "input"
      });

    } else if (this.state.label === "What amenities do you need at your new spot?"){

      var newHeader = "Awesome " + this.state.username + "!";
      this.setState({
        header: newHeader,
        label: "Tell your future roommates about yourself.",
        amenitiesInput: "hidden",
        aboutInput: "input",
        buttonValue: "Sign Up!"
      });

    } else if (this.state.label === "Tell your future roommates about yourself."){
      if (this.state.about === ""){
        this.setState({message: "Don't be shy! You can't leave this blank."});
        return;
      }
      var user = {
        username: this.state.username,
        password: this.state.password,
        city: this.state.city,
        date: this.state.date,
        budget: this.state.budget,
        term: this.state.term,
        dogs: this.state.dogs,
        cats: this.state.cats,
        amenities: this.state.amenities,
        about: this.state.about
      };
      console.log(user);
      this.setState({signUpModalOpen: false});
    }
  },

  dateChange: function (date) {
    this.setState({date: date});
  },

  budgetChange: function (budget) {
    this.setState({budget: parseInt(budget)});
  },

  termChange: function (term) {
    this.setState({term: parseInt(term)});
  },

  toggleCat: function (event) {
    event.preventDefault;
    newState = !this.state.cats;
    this.setState({cats: newState});
  },

  toggleDog: function (event) {
    event.preventDefault;
    newState = !this.state.dogs;
    this.setState({dogs: newState});
  },

  handleClose: function () {
    var closedHeader = "Hey " + this.state.username + ".";
    this.setState({ signUpModalOpen: false, header: closedHeader});
  },

  render: function () {
    if (!this.state.signUpModalOpen){
      return (<div/>);
    } else {
      return(
      <div className="modal is-open">
        <form className="modal-form">

          <span className="modal-close js-modal-close" onClick={this.handleClose}>
            &times;
          </span>

          <h1>{this.state.header}</h1>

          <p>{this.state.message}</p>

          <label className="signup-label">{this.state.label}</label>

          <div className={this.state.usernameInput}>
            <label>Name</label>
            <input type="text" valueLink={this.linkState("username")}/>
          </div>

          <div className={this.state.passwordInput}>
            <label>Password</label>
            <input type="password" valueLink={this.linkState("password")}/>
          </div>

          <div className={this.state.cityInput}>
            <input type="text"
                   valueLink={this.linkState("city")}
                   placeholder={this.state.cityPlaceholder}
            />
          </div>

          <div className={this.state.budgetInput}>
            <Slider range={{min: 100, max: 3000}}
                    start={[this.state.budget]}
                    connect="lower"
                    step={50}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.budgetChange}
            />
          </div>

          <div className={this.state.calendarInput}>
            <Calendar format="MM/DD/YYYY"
                      date={this.state.date}
                      onChange={this.dateChange}
            />
          </div>

          <div className={this.state.termInput}>
            <Slider range={{min: 1, max: 12}}
                    start={[this.state.term]}
                    connect={"lower"}
                    step={1}
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.termChange}
            />
          </div>

          <div className={this.state.petInput}>
            <ButtonGroup bsSize="large">
              <Button onClick={this.toggleCat}
                      active={this.state.cats}>
                      Cat
              </Button>
              <Button onClick={this.toggleDog}
                      active={this.state.dogs}>
                      Dog
              </Button>
            </ButtonGroup>
          </div>

          <div className={this.state.amenitiesInput}>
            <textarea valueLink={this.linkState("amenities")}/>
          </div>

          <div className={this.state.aboutInput}>
            <textarea valueLink={this.linkState("about")}/>
          </div>

          <div className="submit">
            <button onClick={this.handleButton}>{this.state.buttonValue}</button>
          </div>

        </form>
        <div className="modal-screen js-modal-close"></div>
      </div>
      )
    }
  }
});
