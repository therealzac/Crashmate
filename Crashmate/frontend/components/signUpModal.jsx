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
    pageNum: "1/8",
    pageClass: "hidden",
    signUpModalOpen: false,
    backButtonClass: "hidden",
    message: "Need a roommate? We got you.",
    header: "Crashmate",
    label: "",
    buttonValue: "Next",
    username: "",
    usernameInput: "input",
    usernames: [],
    password: "",
    confirmPassword: "",
    passwordInput: "input",
    age: 25,
    ageInput: "hidden",
    gender: "Female",
    genderInput: "hidden",
    occupation: "Student",
    occupationInput: "hidden",
    city: "",
    cityInput: "hidden",
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
  },

  getInitialState: function () {
    return this.resetState;
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.roommatesListener = RoommatesStore.addListener(this._onChange);
    ApiUtil.fetchUsers();
  },

  _onChange: function () {
    var session = SessionStore.getSession();
    var roommates = RoommatesStore.getRoommates();
    this.setState(session);
    this.setState({roommates: roommates});
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.roommatesListener.remove();
  },

  nextButton: function (event) {
    event.preventDefault();
    this.nextMessage();
  },

  backButton: function (event) {
    event.preventDefault();
    this.previousMessage();
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

  handleClose: function (event) {
    event.preventDefault;
    this.setState(this.resetState);
    ApiActions.closeModals();
  },

  nextMessage: function () {
    // First confirm username entry.
    if (this.state.username === ""){
      this.setState({
        message: "What's your name?",
        password: "",
        confirmPassword: ""
      });
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
        password: "",
        confirmPassword: ""
      });
      return;
    }

    // Confirm valid password.
    if (this.state.password.length < 6){
      this.setState({
        message: "Your password must be at least 6 characters.",
        password: "",
        confirmPassword: ""
      });
      return;
    }

    // Confirm passwords match.
    if (this.state.password !== this.state.confirmPassword){
      this.setState({
        message: "Your passwords didn't match.",
        password: "",
        confirmPassword: ""
      });
      return;
    }

    // Begin signup.
    if (this.state.label === ""){
      newHeader = "Hey, " + this.state.username + ".";

      this.setState({
        header: newHeader,
        message: "",
        pageNum: "1/8",
        pageClass: "pageNum",
        label: "First we need some basic info.",
        usernameInput: "hidden",
        passwordInput: "hidden",
        ageInput: "signup-filter-label",
        genderInput: "signup-filter-label",
        occupationInput: "signup-filter-label"
      });

    } else if (this.state.label === "First we need some basic info."){
      this.setState({
        label: "Where are you moving?",
        ageInput: "hidden",
        pageNum: "2/8",
        genderInput: "hidden",
        occupationInput: "hidden",
        cityInput: "input",
        backButtonClass: "back-button"
      });

      // Setup autocomplete functionality for city input.
      var input = (document.getElementById('autocomplete-input'));
      this.autocomplete = new google.maps.places.Autocomplete(input);

    } else if (this.state.label === "Where are you moving?"){
      if (this.state.city === ""){
        if ( this.autocomplete.getPlace() ) {
          this.setState({ city: this.autocomplete.getPlace().formatted_address })
        } else {
          // Re-renders this stage.
          this.nextMessage();
        }
      }

      this.setState({
        label: "When will you be available to move?",
        cityInput: "hidden",
        pageNum: "3/8",
        calendarInput: "signup-filter-label",
      });

    } else if (this.state.label === "When will you be available to move?"){
      console.log(this.state);
      this.setState({
        label: "What's your budget for rent?",
        calendarInput: "hidden",
        pageNum: "4/8",
        budgetInput: "signup-filter-label"
      });

    } else if (this.state.label === "What's your budget for rent?"){

      this.setState({
        label: "How many months can you commit to?",
        budgetInput: "hidden",
        pageNum: "5/8",
        termInput: "signup-filter-label"
      });

    } else if (this.state.label === "How many months can you commit to?"){

      this.setState({
        label: "Do you have any pets?",
        termInput: "hidden",
        pageNum: "6/8",
        petInput: "signup-filter-label"
      });

    } else if (this.state.label === "Do you have any pets?"){

      this.setState({
        header: "Cool.",
        label: "What amenities do you need at your new spot?",
        petInput: "hidden",
        pageNum: "7/8",
        amenitiesInput: "input"
      });

    } else if (this.state.label === "What amenities do you need at your new spot?"){

      var newHeader = "Awesome " + this.state.username + ".";
      this.setState({
        header: newHeader,
        label: "Tell your future roommates about yourself.",
        amenitiesInput: "hidden",
        pageNum: "8/8",
        aboutInput: "input",
        buttonValue: "Sign Up!"
      });

    } else if (this.state.label === "Tell your future roommates about yourself."){
      // Ensure entry.
      if (this.state.about === ""){
        this.setState({message: "You can't leave this blank."});
        return;
      }

      // Create new user after signup.
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
      this.setState(this.resetState)
    }
  },

  previousMessage: function () {
    if (this.state.label === "Where are you moving?") {
        newHeader = "Hey, " + this.state.username + ".";

        this.setState({
          header: newHeader,
          message: "",
          label: "First we need some basic info.",
          usernameInput: "hidden",
          passwordInput: "hidden",
          ageInput: "signup-filter-label",
          genderInput: "signup-filter-label",
          occupationInput: "signup-filter-label",
          cityInput: "hidden",
          backButtonClass: "hidden"
        });

    } else if (this.state.label === "When will you be available to move?"){

        this.setState({
          label: "Where are you moving?",
          ageInput: "hidden",
          genderInput: "hidden",
          occupationInput: "hidden",
          cityInput: "input",
          calendarInput: "hidden"
        });

    } else if (this.state.label === "What's your budget for rent?"){

      this.setState({
        label: "When will you be available to move?",
        cityInput: "hidden",
        calendarInput: "signup-filter-label",
        budgetInput: "hidden"
      });

    } else if (this.state.label === "How many months can you commit to?"){

      this.setState({
        label: "What's your budget for rent?",
        calendarInput: "hidden",
        budgetInput: "signup-filter-label",
        termInput: "hidden"
      });

    } else if (this.state.label === "Do you have any pets?"){

      this.setState({
        label: "How many months can you commit to?",
        budgetInput: "hidden",
        termInput: "signup-filter-label",
        petInput: "hidden"
      });

    } else if (this.state.label === "What amenities do you need at your new spot?"){

      this.setState({
        label: "Do you have any pets?",
        termInput: "hidden",
        petInput: "signup-filter-label",
        amenitiesInput: "hidden"
      });

    } else if (this.state.label === "Tell your future roommates about yourself."){

      this.setState({
        header: "Cool.",
        label: "What amenities do you need at your new spot?",
        petInput: "hidden",
        amenitiesInput: "input",
        aboutInput: "hidden",
        buttonValue: "Next"
      });
    }
  },

  render: function () {
    if (!this.state.signUpModalOpen){
      return (<div/>);
    } else {
      return(
      <div className="modal is-open">
        <form className="modal-form">
          <label className={this.state.pageClass}>{this.state.pageNum}</label>
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

          <div className={this.state.passwordInput}>
            <label>Confirm Password</label>
            <input type="password" valueLink={this.linkState("confirmPassword")}/>
          </div>

          <div className={this.state.ageInput}>
            <div className="age-label">Age</div>
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
            <div>Gender</div>
            <br/>
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
            <div>Occupation</div>
            <br/>
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
            <input id="autocomplete-input"
                   type="text"
                   placeholder="Enter a location"
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
            <button onClick={this.nextButton} className="next-button">{this.state.buttonValue}</button>
            <button onClick={this.backButton} className={this.state.backButtonClass}>Back</button>
          </div>

        </form>
        <div className="modal-screen js-modal-close"></div>
      </div>
      )
    }
  }
});
