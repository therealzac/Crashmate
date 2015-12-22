var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var RoommatesStore = new Store(AppDispatcher);
var RoommateConstants = require('../constants/RoommateConstants.js');

var _roommates = [];

RoommatesStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RoommateConstants.ROOMMATES_RECIEVED:
      setUsers(payload.users);
      RoommatesStore.__emitChange();
      break;
  }
};

setUsers = function (users) {
  _roommates = [];
  users.forEach(function (user) {
    _roommates.push(user);
  });
};

RoommatesStore.getRoommates = function () {
  return _roommates;
}

module.exports = RoommatesStore;
