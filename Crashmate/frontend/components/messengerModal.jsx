var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/session.js');
var RoommatesStore = require('../stores/roommates.js');
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var ApiActions = require('../actions/apiActions.js');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  resetState: {
    type: "Message",
    body: "",
    bodyInput: "input",
    messengerOpen: false
  },

  getInitialState: function () {
    return this.resetState;
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  _onChange: function () {
    session = SessionStore.getSession();
    this.setState({messengerOpen: session.messengerOpen});

    roommates = RoommatesStore.getRoommates();
    id = parseInt(this.props.profileId)

    currentProfile = roommates.filter(function (roommate) {
      return (roommate.id === id)
    });

    if (currentProfile[0]){
      this.setState({
        id: id,
        username: currentProfile[0].username
      });
    }
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },

  handleClose: function (event) {
    event.preventDefault;
    this.setState(this.resetState);
    ApiActions.closeModals();
  },

  setType: function (event) {
    event.preventDefault;
    type = event.currentTarget.innerHTML;
    if (type === "Message"){
      this.setState({type: type, bodyInput: "input"});
    } else {
      this.setState({type: type, bodyInput: "hidden"});
    }
  },

  handleButton: function (event) {
    event.preventDefault;

    var message = {
      type: this.state.type,
      recipient_id: this.state.id,
      sender_id: SessionStore.getSession().id
    }
    if (message.type === "Message") {message.body = this.state.body}

    ApiUtil.createMessage(message);
    ApiActions.closeModals();
  },


  render: function () {
    if (this.state.type === "Message") {
      var message = "Send " + this.state.username + " a message.";
    } else if (this.state.type === "Request") {
      var message = "Ask " + this.state.username + " to be your roommate.";
    }

    if (!this.state.messengerOpen){
      return (<div/>);
    } else {
      return(
        <div className="modal is-open">
          <form className="modal-form">

            <span className="modal-close js-modal-close" onClick={this.handleClose}>
              &times;
            </span>

            <h1>Messenger</h1>

            <p>{message}</p>

            <div className="messenger-type-selector">
              <ButtonGroup bsSize="large">
                <Button onClick={this.setType}
                        active={(this.state.type === "Message")}>
                        Message
                </Button>
                <Button onClick={this.setType}
                        active={(this.state.type === "Request")}>
                        Request
                </Button>
              </ButtonGroup>
            </div>

            <div className={this.state.bodyInput}>
              <textarea valueLink={this.linkState("body")}/>
            </div>

            <div className="submit">
              <button onClick={this.handleButton}>Send</button>
            </div>

          </form>
          <div className="modal-screen js-modal-close"></div>
        </div>
      )
    }
  }
});
