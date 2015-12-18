var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');


var _session = {};

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
    case SessionConstants.INVALID_ENTRY:
      invalidEntry(payload.error);
      SessionStore.__emitChange();
      break;
  }
};

setSession = function (session) {
  _session = session;
  _session.logInModalOpen = false;
  _session.signUpModalOpen = false;
};

clearSession = function () {
  _session = { logInModalOpen: false, signUpModalOpen: false };
};

SessionStore.getSession = function () {
  return _session;
};

openLoginModal = function () {
  _session.logInModalOpen = true;
  _session.messageValue = "Welcome back."
  _session.buttonValue = "Log In";
};

openSignUpModal = function () {
  _session.signUpModalOpen = true;
};

invalidEntry = function (error) {
  _session.messageValue = error.responseJSON[0];
}


module.exports = SessionStore;
