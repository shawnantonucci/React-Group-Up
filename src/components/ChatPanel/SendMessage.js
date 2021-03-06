import React, { useContext, useState } from "react";
import "./SendMessage.css";
import UserContext from "../../context/UserContext";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import firebase from '../../logic/firebase'

/*
text
id (of the message , unique id)
user (some unique id , ... )
current room (some unique id)
timestamp
*/

const SendMessage = ({ messagesRefFirebasePerRoomId }) => {
  const { user } = useContext(UserContext);
  const { currentRoom } = useContext(CurrentRoomContext);
  const [messageText, setMessageText] = useState("");

  const createMessage = messageId => ({
    id: messageId,
    text: messageText,
    roomId: currentRoom.id,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user //user : user
  });

  const messageId = messagesRefFirebasePerRoomId.push().key;

  const newMessage = createMessage(messageId);

  return (
    <div className="SendMessage">
      <input
        onChange={event => setMessageText(event.target.value)}
        placeholder="insert message ..."
        value={messageText}
      />
      <button
        onClick={() =>
          messagesRefFirebasePerRoomId
            .child(messageId)
            .set(newMessage)
            .then(msg => {
              console.log(`set success : ${msg}`);
              setMessageText('')
            })
            .catch(err => console.log(`set error : ${err} `))
        }
      >
        SendMessage
      </button>
    </div>
  );
};

export default SendMessage;
