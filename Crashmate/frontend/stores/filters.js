var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var FilterStore = new Store(AppDispatcher);
var FilterConstants = require('../constants/filterConstants.js');

Date.prototype.getMoveDate = function() {
  var year = this.getFullYear();
  var month = (this.getMonth()+3);
  if (month > 12) {
    month = month - 12;
    year++;
  }
  year = year.toString();
  month = month.toString();
  return month + "-01-" + year;
};

firstOfNextMonth = new Date().getMoveDate();

var _filters = {
  ageRange: [18, 65],
  budget: 500,
  term: 1,
  date: firstOfNextMonth,
  occupation: "Both",
  gender: "Both",
  cats: true,
  dogs: true,
  groupSize: 6
}

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
