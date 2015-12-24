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
        console.log(error);
        ApiActions.invalidEntry(error);
      }
    });
  },

  createMessage: function (message) {
    $.ajax({
      url: "api/messages",
      method: "POST",
      data: {message: message},
      success: function (message) {
        // Send confirmation modal to session store.
      },
      error: function (error) {
        console.log(error);
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
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  fetchMessages: function (id) {
    if (typeof id === 'undefined') {return}
    $.ajax({
      url: "api/messages",
      method: "GET",
      data: {id: id},
      success: function (messages) {
        ApiActions.recieveMessages(messages);
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  markAsRead: function (id) {
    $.ajax({
      url: "api/messages/" + id,
      method: "PATCH",
      data: {id: id},
      success: function (message) {
        console.log(message);
      },
      error: function (error) {
        console.log(error);
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
