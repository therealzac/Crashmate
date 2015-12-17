var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var FilterStore = new Store(AppDispatcher);
var FilterConstants = require('../constants/filterConstants.js');

var _filters = {}

FilterStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FilterConstants.FILTER_RECIEVED:
      setFilters(payload.filter)
      FilterStore.__emitChange();
      break;
  }
};

setFilters = function (newFilters) {
  keys = Object.keys(newFilters);

  keys.forEach(function(key){
    _filters[key] = newFilters[key];
  });
}

FilterStore.getFilters = function () {
  return _filters;
}

module.exports = FilterStore;
