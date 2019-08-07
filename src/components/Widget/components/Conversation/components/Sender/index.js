import React from 'react';
import PropTypes from 'prop-types';

import send from '@assets/send_button.svg';

import './style.scss';

function onChange(e, inputHeight = 300) {
  console.log("onChange")
  if(e.target.scrollHeight >= inputHeight)
    return;
  e.target.style.height = 0;
  e.target.style.height = e.target.scrollHeight + "px";
}

function onKeyPress(e) {
  if(e.which == 13 && !e.shiftKey) {
    e.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
    e.preventDefault();
  }
}

const Sender = ({ sendMessage, placeholder, disabledInput, autofocus, inputHeight }) =>
  <form className="rcw-sender" 
    onSubmit={(e) => {
      e.target.firstChild.style.height = "0";
      sendMessage(e)
    }}>

    <textarea id="rcw-new-message" className="rcw-new-message" 
      onChange={(e) => {onChange(e, inputHeight) }} 
      onKeyPress={onKeyPress}
      name="message" placeholder={placeholder} disabled={disabledInput} autoFocus={autofocus} autoComplete="off"/>
    <button type="submit" className="rcw-send">
      <img src={send} className="rcw-send-icon" alt="send" />
    </button>
  </form>;

Sender.propTypes = {
  sendMessage: PropTypes.func,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool
};

export default Sender;
