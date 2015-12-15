var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');

var _session = {};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.SESSION_RECIEVED:
      SessionStore.setSession(payload.session);
      break;
    case SessionConstants.SESSION_DESTROYED:
      SessionStore.clearSession();
      break;
  }
  SessionStore.__emitChange();
};

SessionStore.setSession = function (session) {
  _session = session;
};

SessionStore.clearSession = function () {
  _session = {};
};

SessionStore.getSession = function () {
  return _session;
}

module.exports = SessionStore;
