var ApiActions = require('../actions/apiActions.js');
module.exports = {
  fetchUsers: function () {
    $.ajax({
      url: "api/users",
      method: "GET",
      success: function (users) {
        ApiActions.recieveUsers(users);
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  createUser: function (user) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      success: function (user) {
        ApiActions.logIn(user);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  logIn: function (user) {
    $.ajax({
      url: "session",
      method: "POST",
      data: {user: user},
      success: function(user){
        ApiActions.logIn(user);
      },
      error: function (error) {
        ApiActions.invalidEntry(error);
      }
    });
  },

  logOut: function () {
    $.ajax({
      url: "session",
      method: "DELETE",
      success: function () {
        ApiActions.logOut();
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  fetchSession: function () {
    $.ajax({
      url: "session",
      method: "GET",
      success: function (session) {
        ApiActions.recieveSession(session);
      }
    });
  },

  fetchCity: function () {
    var geocoder = new google.maps.Geocoder();

    navigator.geolocation.getCurrentPosition(function (position) {
      getCity(position.coords.latitude, position.coords.longitude)
    });

    function getCity(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results) {
        ApiActions.setFilter({city: results[4].formatted_address});
      });
    }
  }
}
