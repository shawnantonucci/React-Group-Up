import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import "./App.css";
import CurrentRoomContext from "../context/CurrentRoomContext";
import UserContext from "../context/UserContext";

const App = () => {
    // --- Todo use null after user login
    const [user, setUser] = useState({
        displayName: "Shawn",
        photoURL: "",
        uid: "id shawn"
    });

    // --- Todo use null after room selected logic
    const [currentRoom, setCurrentRoom] = useState({
        id: "id1",
        name: "room1",
        description: "room1 description"
    });

    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <CurrentRoomContext.Provider
                    value={{ currentRoom, setCurrentRoom }}
                >
                    <SidePanel />
                    <ChatPanel />
                </CurrentRoomContext.Provider>
            </UserContext.Provider>
        </div>
    );
};

export default App;
