var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var RoommatesStore = new Store(AppDispatcher);
var RoommateConstants = require('../constants/roommateConstants.js');
var Faker = require('faker');

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
  if (users.length === _roommates.length) {return}

  _roommates = [];
  users.forEach(function (user) {
    _roommates.push(user);
  });
};

RoommatesStore.getRoommates = function () {
  return _roommates;
}

module.exports = RoommatesStore;
