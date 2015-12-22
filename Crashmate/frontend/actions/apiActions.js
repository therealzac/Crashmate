var AppDispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');
var FilterConstants = require('../constants/filterConstants.js');
var RoommateConstants = require('../constants/roommateConstants.js');

module.exports = {

  recieveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: RoommateConstants.ROOMMATES_RECIEVED,
      users: users
    });
  },

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

  closeModals: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.CLOSE_MODALS
    });
  },

  invalidEntry: function (error) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.INVALID_ENTRY,
      error: error
    });
  },

  recieveSession: function (session) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_RECIEVED,
      session: session
    });
  },

  setFilter: function (filter) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.FILTER_RECIEVED,
      filter: filter
    });
  }
}
