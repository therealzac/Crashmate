var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var RoommatesStore = new Store(AppDispatcher);

var _roommates = {};

module.exports = RoommatesStore;
