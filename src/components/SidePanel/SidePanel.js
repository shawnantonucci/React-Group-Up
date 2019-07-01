import React from "react";
import "./SidePanel.css";
import User from "./User";
import Rooms from "./Rooms";
import { Header, Icon } from "semantic-ui-react";
import { appName, appIconName } from "../../logic/constants";

const SidePanel = () => {
    return (
        <div className="SidePanel">
            <Header inverted as="h2">
                <Icon name={appIconName} />
                {appName}
            </Header>
            {/* <User /> */}
            <Rooms />
        </div>
    );
};

export default SidePanel;
