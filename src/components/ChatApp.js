import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./ChatApp.css";
import CurrentRoomContext from "../context/CurrentRoomContext";
import UserContext from "../context/UserContext";

const ChatApp = () => {
   // --- todo use null after user login
  const [user, setUser] = useState({
    displayName: "Nathan",
    photoURL: "",
    uid: "id nathan"
  });

  // --- todo use null after room selected logic
  const [currentRoom, setCurrentRoom] = useState({
    id: "idroom1",
    name: "room1",
    description: "room1 description"
  });

  return (
    <div className="ChatApp">
      <UserContext.Provider value={{ user, setUser }}>
        <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
          <SidePanel />
          <ChatPanel />
        </CurrentRoomContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default ChatApp;
