import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

const User = () => {
  const { user } = useContext(UserContext);
  return <div>Welcome {user.displayName}</div>;
};

export default User;
