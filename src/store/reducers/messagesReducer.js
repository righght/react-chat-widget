import { List } from 'immutable';

import { createReducer } from '@utils/store';
import { createNewMessage, createLinkSnippet, createComponentMessage } from '@utils/messages';
import { MESSAGE_SENDER } from '@constants';

import * as actionTypes from '../actions/actionTypes';

const initialState = { messages: List([]), unshiftIndex: 0 };
// const initialState =List([]);

const messagesReducer = {
  [actionTypes.ADD_COMPONENT_TOP]: (state, { component, props, showAvatar }) => {
    return {messages: state.messages.unshift(createComponentMessage(component, props, showAvatar)), unshiftIndex: --state.unshiftIndex }
  },

  [actionTypes.ADD_NEW_USER_MESSAGE]: (state, { text }) =>
    // state.messages.push(createNewMessage(text, MESSAGE_SENDER.CLIENT))
  {
    return { messages: state.messages.push(createNewMessage(text, MESSAGE_SENDER.CLIENT)), unshiftIndex: state.unshiftIndex }
  },

  [actionTypes.ADD_NEW_RESPONSE_MESSAGE]: (state, { text }) =>
  // state.messages.push(createNewMessage(text, MESSAGE_SENDER.RESPONSE))
  {
    return { messages: state.messages.push(createNewMessage(text, MESSAGE_SENDER.RESPONSE)), unshiftIndex:state.unshiftIndex }
  },
    
  [actionTypes.ADD_NEW_LINK_SNIPPET]: (state, { link }) =>
  // state.messages.push(createLinkSnippet(link, MESSAGE_SENDER.RESPONSE)),
  {
    return { messages: state.messages.push(createLinkSnippet(link, MESSAGE_SENDER.RESPONSE)), unshiftIndex: state.unshiftIndex }
  },
    
  [actionTypes.ADD_COMPONENT_MESSAGE]: (state, { component, props, showAvatar }) =>
    // state.messages.push(createComponentMessage(component, props, showAvatar)),
  {
    return  { messages: state.messages.push(createComponentMessage(component, props, showAvatar)), unshiftIndex: state.unshiftIndex }
  },

  [actionTypes.DROP_MESSAGES]: () => initialState,

  [actionTypes.HIDE_AVATAR]: (state, { index }) =>
    // state.messages.update(index, message => message.set('showAvatar', false))
  {
    return { messages: state.messages.update(index, message => message.set('showAvatar', false)), unshiftIndex: state.unshiftIndex }
  }
}

export default (state = initialState, action) => createReducer(messagesReducer, state, action);