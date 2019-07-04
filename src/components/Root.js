import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ChatApp from "./ChatApp";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import UserContext from "../context/UserContext";
import firebase from "../logic/firebase";
import {withRouter} from 'react-router-dom'

const Root = ({ history }) => {
  const [user, setUser] = useState({ displayName: "", uid: "", photoURL: "" });

  useEffect(() => {
    console.log("mount");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("allready logged in -> navigate to /");
        const { displayName, uid, photoURL } = user;
        setUser({ displayName, uid, photoURL });
        history.push("/");
      } else {
        console.log("not logged in -> navigate to /Login");
        history.push("/Login");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Switch>
        <Route exact path="/" component={ChatApp} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </UserContext.Provider>
  );
};

export default withRouter(Root);
