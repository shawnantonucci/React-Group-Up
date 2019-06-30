import React from "react";
import "./SidePanel.css";
import User from "./User";
import Rooms from "./Rooms";

const SidePanel = () => {
  return (
    <div className="SidePanel">
      <h2>GroupUp</h2>
      <User />
      <Rooms />
    </div>
  );
};

export default SidePanel;
