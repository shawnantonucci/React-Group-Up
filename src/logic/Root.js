import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import GroupUpApp from "../components/GroupUpApp";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import UserContext from "../context/UserContext";
import firebase from "../logic/firebase";

const Root = ({ history }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const { displayName, uid, photoURL } = user;
                setUser({ displayName, uid, photoURL });
                history.push("/");
            } else {
                history.push("/Login");
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Switch>
                <Route exact path="/" component={GroupUpApp} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
            </Switch>
        </UserContext.Provider>
    );
};

export default Root;
