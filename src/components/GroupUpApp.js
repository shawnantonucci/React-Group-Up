import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./GroupUpApp.css";
import CurrentRoomContext from "../context/CurrentRoomContext";
import UserContext from "../context/UserContext";

const GroupUpApp = () => {
  // --- todo use null after user login
  const [user, setUser] = useState({
    displayName: "Nathan",
    photoURL: "https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_960_720.png",
    uid: "id nathan"
  });


  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <div className="GroupUpApp">
      <UserContext.Provider value={{ user, setUser }}>
        <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
          <SidePanel />
          {currentRoom ? <ChatPanel /> : <h3>Please choose a chat room</h3>}
        </CurrentRoomContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default GroupUpApp;
