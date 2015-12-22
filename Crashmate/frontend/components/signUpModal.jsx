var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require("../actions/apiActions.js");
var SessionStore = require('../stores/session.js');
var FilterStore = require('../stores/filters.js');
var RoommatesStore = require('../stores/roommates.js');
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
    usernames: [],
    password: "",
    passwordInput: "input",
    age: 25,
    ageInput: "hidden",
    gender: "Female",
    genderInput: "hidden",
    occupation: "Student",
    occupationInput: "hidden",
    city: "",
    cityInput: "hidden",
    cityPlaceholder: "Where are you moving?",
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
    about: "",
    // loggingIn: false
  },

  getInitialState: function () {
    return this.resetState;
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.filtersListener = FilterStore.addListener(this._onChange);
    this.roommatesListener = RoommatesStore.addListener(this._onChange);
  },

  _onChange: function () {
    var session = SessionStore.getSession();
    var roommates = RoommatesStore.getRoommates();
    var filters = FilterStore.getFilters();
    this.setState(session);
    this.setState({roommates: roommates});
    this.setState({city: filters.city});
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.filtersListener.remove();
    this.roommatesListener.remove();
  },

  handleButton: function (event) {
    event.preventDefault();
    this.nextMessage();
  },

  usernameTaken: function (username) {
    isTaken = false;
    this.state.roommates.forEach(function (roommate) {
      if (roommate.username === username) { isTaken = true}
    });
    return isTaken;
  },

  ageChange: function (age) {
    this.setState({age: parseInt(age)});
  },

  setGender: function (event) {
    event.preventDefault;
    this.setState({gender: event.currentTarget.innerHTML});
  },

  setOccupation: function (event) {
    event.preventDefault;
    this.setState({occupation: event.currentTarget.innerHTML});
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
    this.setState(this.resetState);
    ApiActions.closeModals();
  },

  nextMessage: function () {
    // First confirm username entry.
    if (this.state.username === ""){
      this.setState({message: "What's your name?", password: ""});
      return;
    }

    // Ensure username isn't in DB.
    if (this.usernameTaken(this.state.username)){
      var newMessage = "Sorry, '" +
                       this.state.username +
                       "' has already been taken as a username.";

      this.setState({
        message: newMessage,
        username: "",
        password: ""
      });
      return;
    }

    // Confirm valid password.
    if (this.state.password.length < 6){
      this.setState({
        message: "Your password must be at least 6 characters.",
        password: ""
      });
      return;
    }

    // Begin signup.
    if (this.state.label === ""){
      newHeader = "Hey, " + this.state.username + ".";

      this.setState({
        header: newHeader,
        message: "",
        label: "Basic info.",
        usernameInput: "hidden",
        passwordInput: "hidden",
        ageInput: "signup-filter-label",
        genderInput: "signup-filter-label",
        occupationInput: "signup-filter-label"
      });

    } else if (this.state.label === "Basic info."){
      this.setState({
        label: "Where are you moving?",
        ageInput: "hidden",
        genderInput: "hidden",
        occupationInput: "hidden",
        cityInput: "input"
      });

    } else if (this.state.label === "Where are you moving?"){
      if (this.state.city === ""){
        if (this.state.cityPlaceholder !== "Where are you moving?"){
          this.setState({city: this.state.cityPlaceholder});
        } else {
          this.setState({
            message: "Please enter a city to continue."
          })
          this.nextMessage();
        }
      }

      this.setState({
        label: "When will you be available to move?",
        cityInput: "hidden",
        calendarInput: "signup-filter-label",
      });

    } else if (this.state.label === "When will you be available to move?"){

      this.setState({
        label: "What's your budget for rent?",
        calendarInput: "hidden",
        budgetInput: "signup-filter-label"
      });

    } else if (this.state.label === "What's your budget for rent?"){

      this.setState({
        label: "How many months can you commit to?",
        budgetInput: "hidden",
        termInput: "signup-filter-label"
      });

    } else if (this.state.label === "How many months can you commit to?"){

      this.setState({
        label: "Do you have any pets?",
        termInput: "hidden",
        petInput: "signup-filter-label"
      });

    } else if (this.state.label === "Do you have any pets?"){

      this.setState({
        header: "Cool.",
        label: "What amenities do you need at your new spot?",
        petInput: "hidden",
        amenitiesInput: "input"
      });

    } else if (this.state.label === "What amenities do you need at your new spot?"){

      var newHeader = "Awesome " + this.state.username + ".";
      this.setState({
        header: newHeader,
        label: "Tell your future roommates about yourself.",
        amenitiesInput: "hidden",
        aboutInput: "input",
        buttonValue: "Sign Up!"
      });

    } else if (this.state.label === "Tell your future roommates about yourself."){
      // Ensure entry.
      if (this.state.about === ""){
        this.setState({message: "You can't leave this blank."});
        return;
      }

      // Create new user and push index page to url history.
      var user = {
        username: this.state.username,
        password: this.state.password,
        age: this.state.age,
        city: this.state.city,
        date: this.state.date,
        budget: this.state.budget,
        term: this.state.term,
        dogs: this.state.dogs,
        cats: this.state.cats,
        amenities: this.state.amenities,
        about: this.state.about,
        gender: this.state.gender,
        occupation: this.state.occupation
      };
      ApiUtil.createUser(user);
      ApiActions.renderLogInModal();
    }
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

          <div className={this.state.ageInput}>
            <Slider range={{min: 18, max: 65}}
                    start={[this.state.age]}
                    step={1}
                    connect="lower"
                    tooltips
                    format={wNumb({decimals: 0})}
                    onChange={this.ageChange}
            />
          </div>

          <div className={this.state.genderInput}>
            <ButtonGroup bsSize="large">
              <Button onClick={this.setGender}
                      active={(this.state.gender === "Female")}>
                      Female
              </Button>
              <Button onClick={this.setGender}
                      active={(this.state.gender === "Male")}>
                      Male
              </Button>
            </ButtonGroup>
          </div>

          <div className={this.state.occupationInput}>
            <ButtonGroup bsSize="large">
              <Button onClick={this.setOccupation}
                      active={(this.state.occupation === "Student")}>
                      Student
              </Button>
              <Button onClick={this.setOccupation}
                      active={(this.state.occupation === "Professional")}>
                      Professional
              </Button>
            </ButtonGroup>
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
