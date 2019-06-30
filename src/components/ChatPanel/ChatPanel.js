import React, { useState, useEffect, useRef, useContext } from "react";
import "./ChatPanel.css";
import firebase from "../../logic/firebase";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import CurrentRoom from "./CurrentRoom";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);

  const refTo_messagesVariable = useRef();
  refTo_messagesVariable.current = messages;

  const { currentRoom } = useContext(CurrentRoomContext);

  const messagesRefFirebase = firebase.database().ref("messages");
  const messagesRefFirebasePerRoomId = messagesRefFirebase.child(
    currentRoom.id
  );

  const addMessagesListener = () => {
    console.log(`addMessagesListener , currentRoom.id : ${currentRoom.id}`);
    setMessages([]);
    messagesRefFirebasePerRoomId.on("child_added", snap => {
      console.log(snap.val());
      console.log(refTo_messagesVariable.current);
      const newMessages = [...refTo_messagesVariable.current];
      newMessages.push(snap.val());
      setMessages(newMessages);
    });
  };

  const removeMessagesListener = () => {
    console.log(`removeMessagesListener , currentRoom.id : ${currentRoom.id}`);
    messagesRefFirebasePerRoomId.off();
  };

  useEffect(() => {
    addMessagesListener();

    return () => removeMessagesListener();
  }, [currentRoom.id]);

  return (
    <div className="ChatPanel">
      <CurrentRoom messages={messages} />
      <Messages messages={messages} />
      <SendMessage
        messagesRefFirebasePerRoomId={messagesRefFirebasePerRoomId}
      />
    </div>
  );
};

export default ChatPanel;
