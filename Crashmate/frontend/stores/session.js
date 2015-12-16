var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');

var _session = { modalOpen: false, buttonValue: "", messageValue: ""};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.SESSION_RECIEVED:
      SessionStore.setSession(payload.session);
      break;
    case SessionConstants.SESSION_DESTROYED:
      SessionStore.clearSession();
      break;
    case SessionConstants.RENDER_SIGNUP_MODAL:
      SessionStore.openSignUpModal();
      break;
    case SessionConstants.RENDER_LOGIN_MODAL:
      SessionStore.openLoginModal();
      break;
    case SessionConstants.INVALID_ENTRY:
      SessionStore.invalidEntry(payload.error);
      break;
  }
  SessionStore.__emitChange();
};

SessionStore.setSession = function (session) {
  _session = session;
  _session.modalOpen = false;
};

SessionStore.clearSession = function () {
  _session = { modalOpen: false };
};

SessionStore.getSession = function () {
  return _session;
};

SessionStore.openLoginModal = function () {
  _session.modalOpen = true;
  _session.messageValue = "Welcome back."
  _session.buttonValue = "Log In";
};

SessionStore.openSignUpModal = function () {
  _session.modalOpen = true;
  _session.messageValue = "Need a roommate? We got you."
  _session.buttonValue = "Sign Up";
};

SessionStore.invalidEntry = function (error) {
  _session.messageValue = error.responseJSON[0];
}


module.exports = SessionStore;
