import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./GroupUpApp.css";
import CurrentRoomContext from "../context/CurrentRoomContext";

const GroupUpApp = () => {
    const [currentRoom, setCurrentRoom] = useState(null);

    return (
        <div className="GroupUpApp">
            <CurrentRoomContext.Provider
                value={{ currentRoom, setCurrentRoom }}
            >
                <SidePanel />
                {currentRoom ? (
                    <ChatPanel />
                ) : (
                    <h3>Please choose a chat room</h3>
                )}
            </CurrentRoomContext.Provider>
        </div>
    );
};

export default GroupUpApp;
