import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { hideAvatar } from '@actions';

import './styles.scss';

const scrollToBottom = () => {
  const messagesDiv = document.getElementById('messages');
  if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

class Messages extends Component {
  constructor(props) {
    super(props)
  }
  

  componentDidMount() {
    scrollToBottom();
  }

  componentDidUpdate() {
    // scrollToBottom();
  }

  getComponentToRender = message => {
    const ComponentToRender = message.get('component');
    const previousMessage = this.props.messages.get()
    if (message.get('type') === 'component') {
      return <ComponentToRender {...message.get('props')} />;
    }
    return <ComponentToRender message={message} />;
  };

  shouldRenderAvatar = (message, index) => {
    const previousMessage = this.props.messages.get(index - 1);
    if (message.get('showAvatar') && previousMessage.get('showAvatar')) {
      this.props.dispatch(hideAvatar(index));
    }
  }

  render() {
    const { messages, profileAvatar, unshiftIndex } = this.props;
    let uns = unshiftIndex;
    return (
      <div id="messages" className="rcw-messages-container">
        {messages.map((message, index) => {         
          // let id = message.get("props") && message.get('props').id;
          // if(id) index = id;
          index = uns++;

          return <div className="rcw-message" key={index}>
            {/* {profileAvatar &&
              this.shouldRenderAvatar(message, index) &&
              <img src={profileAvatar} className="rcw-avatar" alt="profile" />
            } */}
            {this.getComponentToRender(message)}
          </div>}
        )}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  profileAvatar: PropTypes.string
};

export default connect(store => ({
  messages: store.messages.messages,
  unshiftIndex: store.messages.unshiftIndex
}))(Messages);
