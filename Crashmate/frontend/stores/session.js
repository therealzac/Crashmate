var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');


var _session = {logInModalOpen: false, signUpModalOpen: false};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.USERS_RECIEVED:
      setUsernames(payload.users);
      SessionStore.__emitChange();
      break;
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

setUsernames = function (users) {
  _session.usernames = [];
  users.forEach(function(user){
    _session.usernames.push(user.username)
  });
};

setSession = function (session) {
  _session.username = session.username;
  _session.id = session.id;
};

clearSession = function () {
  _session = {
    logInModalOpen: false,
    signUpModalOpen: false
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
};

invalidEntry = function (error) {
  _session.message = error.responseJSON[0];
}


module.exports = SessionStore;
