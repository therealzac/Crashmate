var React = require('react');
var RoommatesStore = require('../stores/roommates.js');
var SessionStore = require('../stores/session.js');
var ApiActions = require('../actions/apiActions.js');

module.exports = React.createClass({
  getInitialState: function () {
    roommates = RoommatesStore.getRoommates();
    session = SessionStore.getSession();
    return {
      messageOpen: false,
      sender_id: session.sender_id,
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
      sender_id: session.sender_id,
      messageOpen: session.messageOpen,
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
    var userUrl = "/users/" + this.state.sender_id
    this.props.history.push(userUrl);
    ApiActions.closeModals();
  },

  render: function () {
    if (!this.state.messageOpen){
      return (<div/>);
    } else {

      sender = this.getSender();
      return(
        <div className="modal is-open">
          <form className="modal-form">

            <span className="modal-close js-modal-close" onClick={this.handleClose}>
              &times;
            </span>

            <h1>Message from {sender}:</h1>


            <div className="recieved-message">{this.state.recievedMessage}</div>

            <div className="submit">
              <button onClick={this.handleButton}>Reply</button>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});
