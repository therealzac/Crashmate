var ApiActions = require('../actions/apiActions.js');
module.exports = {
  createUser: function (user) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: user},
      success: function (user) {
        console.log(user);
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
          console.log(user);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
}
