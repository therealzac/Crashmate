var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

module.exports = {
  logIn: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_RECIEVED,
      session: user
    });
  },

  logOut: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_DESTROYED,
    });
  },

  renderLogInModal: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RENDER_LOGIN_MODAL
    });
  },

  renderSignUpModal: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RENDER_SIGNUP_MODAL
    });
  },

  invalidEntry: function (error) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.INVALID_ENTRY,
      error: error
    });
  }
}
