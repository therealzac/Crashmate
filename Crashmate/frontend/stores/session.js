var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');
var FilterStore = require('./filters.js');
var ApiUtil = require('../util/apiUtil.js');
var History = require('react-router').History;


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
  cats: false,
  date: firstOfNextMonth,
  dogs: false,
  gender: "Female",
  term: 3,
  occupation: "Student",
  logInModalOpen: false,
  signUpModalOpen: false,
  messengerOpen: false,
  messageOpen: false,
  editOpen: false,
  navBar: "header",
  messages: []
  };

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case SessionConstants.SESSION_RECIEVED:
      setSession(payload.session);
      SessionStore.__emitChange();
      break;

    case SessionConstants.MESSAGES_RECIEVED:
      setMessages(payload.messages);
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

    case SessionConstants.REQUIRE_LOG_IN:
      requireLogin();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_MESSENGER:
      openMessenger();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_MESSAGE:
      openMessage(payload.message);
      SessionStore.__emitChange();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_EDIT:
      openEdit();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_OPAQUE_NAV_BAR:
      opaqueNavBar();
      SessionStore.__emitChange();
      break;

    case SessionConstants.RENDER_TRANSPARENT_NAV_BAR:
      transparentNavBar();
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
  _session.messengerOpen = false;
  _session.messageOpen = false;
  _session.editOpen = false;
};

setSession = function (session) {
  var navBars = _session.navBar;

  _session = session;

  closeModals();
  _session.navBar = navBars;
  _session.messages = [];
  ApiUtil.fetchMessages(_session.id);
};

setMessages = function (messages) {
  _session.messages = messages;
};

clearSession = function () {
  _session = {
    logInModalOpen: false,
    signUpModalOpen: false,
    signUpModalOpen: false,
    messengerOpen: false,
    messageOpen: false,
    editOpen: false,
    message: "Need a roommate? We got you.",
    header: "Crashmate",
    label: "",
    username: "",
    buttonValue: "Next",
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
    messages: []
    };
};

SessionStore.getSession = function () {
  return _session;
};

openLoginModal = function () {
  _session.logInModalOpen = true;
  _session.message = "Welcome back."
};

requireLogin = function () {
  _session.logInModalOpen = true;
  _session.message = "Please log in to continue."
};

openSignUpModal = function () {
  _session.signUpModalOpen = true;
  _session.message = "Need a roommate? We got you."
};

openMessenger = function () {
  _session.messageOpen = false;
  _session.messengerOpen = true;
};

openMessage = function (message) {
  _session.messageOpen = true;
  _session.sender_id = message.sender_id;
  _session.sender_group_id = message.sender.group_id;
  _session.recievedMessage = message.body;
  _session.messageType = message.type;

  messageIndex = _session.messages.indexOf(message);
  _session.messages.splice(messageIndex, 1);

  ApiUtil.markAsRead(message.id);
}

openEdit = function () {
  _session.editOpen = true;
}

opaqueNavBar = function () {
  _session.navBar = "header-opaque";
};

transparentNavBar = function () {
  _session.navBar = "header";
};

invalidEntry = function (error) {
  _session.message = error.responseJSON[0];
}


module.exports = SessionStore;
