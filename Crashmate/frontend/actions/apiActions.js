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

  renderSessionModal: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RENDER_MODAL
    });
  }
}
