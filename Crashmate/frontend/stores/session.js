var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');

var _session = { modalOpen: false };

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.SESSION_RECIEVED:
      SessionStore.setSession(payload.session);
      break;
    case SessionConstants.SESSION_DESTROYED:
      SessionStore.clearSession();
      break;
    case SessionConstants.RENDER_MODAL:
      SessionStore.openModal();
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

SessionStore.openModal = function () {
  _session.modalOpen = true;
};

module.exports = SessionStore;
