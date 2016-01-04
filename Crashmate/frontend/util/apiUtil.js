var ApiActions = require('../actions/apiActions.js');
ApiUtil = {

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

  updateUser: function (user) {
    $.ajax({
      url: "api/users/" + user.id,
      method: "PATCH",
      data: {user: user},
      success: function (user) {
        ApiActions.closeModals();
        ApiUtil.fetchUsers();
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  groupUsers: function (id1, id2) {
    $.ajax({
      url: "api/groups",
      method: "POST",
      data: {id1: id1, id2: id2},
      success: function (payload) {
        ApiUtil.fetchUsers();
      },
      error: function (error) {
        console.log(error);
      }
    });
  },

  addUserToGroup: function (id, group_id) {
    $.ajax({
      url: "api/users/" + id,
      method: "PATCH",
      data: {group_id: group_id},
      success: function (payload) {
        ApiUtil.fetchUsers();
      },
      error: function (error) {
        console.log(error);
      },
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
      error: function (error) {
        console.log(error);
      }
    });
  }
}

module.exports = ApiUtil;
