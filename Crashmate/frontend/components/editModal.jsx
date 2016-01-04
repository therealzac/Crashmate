var React = require('react');
var SessionStore = require('../stores/session.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');
var Slider = require('react-nouislider');
var Calendar = require('react-input-calendar');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;

EditModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return SessionStore.getSession();
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    session = SessionStore.getSession();
    this.setState(session);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleClose: function (event) {
    event.preventDefault;
    this.setState(SessionStore.getSession());
    ApiActions.closeModals();
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

  leaveGroup: function (event) {
    event.preventDefault();
    var user = {
      id: this.state.id,
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
      occupation: this.state.occupation,
      group_id: null
    };
    ApiUtil.updateUser(user);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var user = {
      id: this.state.id,
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
      occupation: this.state.occupation,
      group_id: this.state.group_id
    };
    ApiUtil.updateUser(user);
  },

  render: function () {
    if (!this.state.editOpen){
      return (<div/>);
    } else {
      var input = (document.getElementById('autocomplete-input'));
      if (input){
        this.autocomplete = new google.maps.places.Autocomplete(input);
      }

      return(
        <div className="modal is-open">
          <form className="edit-modal-form">

            <span className="modal-close js-modal-close" onClick={this.handleClose}>
              &times;
            </span>

            <div className="edit-filter-label">
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

            <div className="edit-filter-label">
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

            <div className="edit-filter-label">
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

            <div className="input">
            <div>Moving to</div>
              <input id="autocomplete-input"
                     type="text"
                     placeholder={this.state.city}
              />
            </div>

            <div className="edit-filter-label">
            <div>Budget</div>
              <Slider range={{min: 100, max: 3000}}
                      start={[this.state.budget]}
                      connect="lower"
                      step={50}
                      tooltips
                      format={wNumb({decimals: 0})}
                      onChange={this.budgetChange}
              />
            </div>

            <div className="edit-filter-label">
            <div>Available by</div>
              <Calendar format="MM/DD/YYYY"
                        date={this.state.date}
                        onChange={this.dateChange}
              />
            </div>

            <div className="edit-filter-label">
            <div>Minimum Months</div>
              <Slider range={{min: 1, max: 12}}
                      start={[this.state.term]}
                      connect={"lower"}
                      step={1}
                      tooltips
                      format={wNumb({decimals: 0})}
                      onChange={this.termChange}
              />
            </div>

            <div className="edit-filter-label">
            <div>Pets</div>
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

            <div className="input">
              <div>Amenities</div>
              <textarea valueLink={this.linkState("amenities")}/>
            </div>

            <div className="input">
              <div>About</div>
              <textarea valueLink={this.linkState("about")}/>
            </div>

            <div className="leave-group">
              <button onClick={this.leaveGroup}>Leave Group</button>
            </div>

            <div className="edit-submit">
              <button onClick={this.handleSubmit}>Submit</button>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});

module.exports = EditModal;
