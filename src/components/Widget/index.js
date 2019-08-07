import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleChat, addUserMessage, addCompTop } from '@actions';

import WidgetLayout from './layout';

import { renderCustomComponent } from '../../store/actions';
import { toggleWidget} from '../../store/dispatcher';

class Widget extends Component {
  constructor(props) {
    super(props)
    this.messageId = 0
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
      this.props.dispatch(toggleChat());
    }
  }

  toggleConversation = () => {
    this.props.dispatch(toggleChat());
  }

  handleMessageSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;
    if (userInput) {
      // this.props.dispatch(addUserMessage(userInput));
      this.props.handleNewUserMessage(userInput);
    }
    event.target.message.value = '';
  }

  getMessId = () => {
    return this.messageId++;
  }
  /* <button onClick={(e) => e.target.style.display = "none"}>{props.kek}</button> */
  render() {
    // toggleWidget()
    return (
        // <div>
        /* <button onClick={() => this.props.dispatch(addCompTop((props) => { return <div><button onClick={(e) => e.target.style.display = "none"}>{props.kek}</button></div>
        }, {kek:"lasdfasjdg"}))}>kek</button>  */
        // <button onClick={() => this.props.dispatch(renderCustomComponent(keker, {kek:"lasdfasjdg", id: "opa"}))}>kek</button>  
        <WidgetLayout
          onToggleConversation={this.toggleConversation}
          onSendMessage={this.handleMessageSubmit}
          title={this.props.title}
          titleAvatar={this.props.titleAvatar}
          subtitle={this.props.subtitle}
          senderPlaceHolder={this.props.senderPlaceHolder}
          profileAvatar={this.props.profileAvatar}
          showCloseButton={this.props.showCloseButton}
          fullScreenMode={this.props.fullScreenMode}
          badge={this.props.badge}
          autofocus={this.props.autofocus}
          customLauncher={this.props.customLauncher}

          getMessId={this.getMessId}
          inputHeight={this.props.inputHeight}
        />
        // </div>
    );
  }
}

Widget.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
};

export default connect()(Widget);
