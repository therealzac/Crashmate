var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');
var FilterStore = require('./filters.js');

Date.prototype.getMoveDate = function() {
  var year = this.getFullYear();
  var month = (this.getMonth()+3);
  if (month > 12) {
    month = month - 12;
    year++;
  }
  year = year.toString();
  month = month.toString();
  return month + "-01-" + year;
};

firstOfNextMonth = new Date().getMoveDate();

var _session = {
  about: "",
  age: 25,
  amenities: "",
  budget: 500,
  cats: true,
  city: "",
  date: firstOfNextMonth,
  dogs: true,
  gender: "Both",
  id: null,
  logInModalOpen: false,
  occupation: "Both",
  signUpModalOpen: false,
  term: null,
  username: ""
  };

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case SessionConstants.SESSION_RECIEVED:
      setSession(payload.session);
      SessionStore.__emitChange();
      break;

    case SessionConstants.SESSION_DESTROYED:
      clearSession();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_SIGNUP_MODAL:
      openSignUpModal();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_LOGIN_MODAL:
      openLoginModal();
      SessionStore.__emitChange();
      break;

    case SessionConstants.CLOSE_MODALS:
      closeModals();
      SessionStore.__emitChange();
      break;

    case SessionConstants.INVALID_ENTRY:
      invalidEntry(payload.error);
      SessionStore.__emitChange();
      break;

  }
};

closeModals = function () {
  _session.logInModalOpen = false;
  _session.signUpModalOpen = false;
};

setSession = function (session) {
  _session = session;
  closeModals();
};

clearSession = function () {
  _session = {
    logInModalOpen: false,
    signUpModalOpen: false,
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
    about: ""
    };
};

SessionStore.getSession = function () {
  return _session;
};

openLoginModal = function () {
  _session.logInModalOpen = true;
  _session.message = "Welcome back."
};

openSignUpModal = function () {
  _session.signUpModalOpen = true;
  _session.message = "Need a roommate? We got you."
};

invalidEntry = function (error) {
  _session.message = error.responseJSON[0];
}


module.exports = SessionStore;
