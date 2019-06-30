import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Image } from "semantic-ui-react";
import "./User.css"

const User = () => {
    const { user } = useContext(UserContext);
    return (
        <div className="User">
            <Image src={user.photoURL} avatar/>
            <h4>Welcome {user.displayName}</h4>
        </div>
    );
};

export default User;
