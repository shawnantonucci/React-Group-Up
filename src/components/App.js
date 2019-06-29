import React from "react";
import SidePanel from './SidePanel/SidePanel'
import ChatPanel from './ChatPanel/ChatPanel'
import './App.css'

const App = () => {
    return (
        <div className="App">
            <SidePanel />
            <ChatPanel />
        </div>
    )
};

export default App;
