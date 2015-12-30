var React = require('react');
var RoommatesStore = require('../stores/roommates.js');
var SessionStore = require('../stores/session.js');
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  getInitialState: function () {
    roommates = RoommatesStore.getRoommates();
    session = SessionStore.getSession();
    return {
      messageOpen: false,
      sender_id: session.sender_id,
      messageType: session.messageType,
      recievedMessage: session.recievedMessage,
      roommates: roommates
    }
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    roommates = RoommatesStore.getRoommates();
    session = SessionStore.getSession();
    this.setState({
      my_id: session.id,
      my_group_id: session.group_id,
      sender_id: session.sender_id,
      sender_group_id: session.sender_group_id,
      messageOpen: session.messageOpen,
      messageType: session.messageType,
      recievedMessage: session.recievedMessage,
      roommates: roommates
    });
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  getSender: function () {
    sender_id = this.state.sender_id;
    sender = this.state.roommates.filter(function (roommate) {
      return (roommate.id === sender_id)
    });
    return sender[0].username;
  },

  handleClose: function (event) {
    event.preventDefault;
    ApiActions.closeModals();
  },

  handleButton: function (event) {
    event.preventDefault;
    if (event.currentTarget.innerHTML === "Reply"){
      var userUrl = "/users/" + this.state.sender_id
      this.props.history.push(userUrl);
    } else {
      if (this.state.my_group_id){
        ApiUtil.addUserToGroup(this.state.sender_id, this.state.my_group_id);
      } else if (this.state.sender_group_id){
          ApiUtil.addUserToGroup(this.state.my_id, this.state.sender_group_id);
      } else {
        ApiUtil.groupUsers(this.state.my_id, this.state.sender_id);
      }
    }
    ApiActions.closeModals();
  },

  render: function () {
    if (!this.state.messageOpen){
      return (<div/>);
    } else {
      if (this.state.messageType === "Request"){
        var buttonValue = "Confirm"
      } else {
        var buttonValue = "Reply"
      }
      var sender = this.getSender();
      return(
        <div className="modal is-open">
          <form className="modal-form">

            <span className="modal-close js-modal-close" onClick={this.handleClose}>
              &times;
            </span>

            <h1>Message from {sender}:</h1>


            <div className="recieved-message">{this.state.recievedMessage}</div>

            <div className="submit">
              <button onClick={this.handleButton}>{buttonValue}</button>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});
