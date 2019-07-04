import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Image, Dropdown } from "semantic-ui-react";
import "./UserMenu.css";
import firebase from "../../logic/firebase";
import CurrentRoomContext from "../../context/CurrentRoomContext";


const UserMenu = () => {
  const { user } = useContext(UserContext);
  const { setCurrentRoom } = useContext(CurrentRoomContext);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout success");
        setCurrentRoom("");
      })
      .catch(() => console.log("logout failed"));
  };

  return (
    <div className="UserMenu">
      <Image src={user.photoURL} avatar />
      <Dropdown text={user.displayName} as="h4" >
        <Dropdown.Menu>
          <Dropdown.Item onClick={logout} text="Logout"/>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
