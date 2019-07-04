import React from "react";
import { Message } from "semantic-ui-react";
import './MessageError.css'

const MessageError = ({ error }) => {
  return (
    <div className="MessageError">{error ? <Message negative>{error}</Message> : ""}</div>
  );
};

export default MessageError;
