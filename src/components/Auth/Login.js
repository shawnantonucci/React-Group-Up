import React, {useContext, useState} from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import "./Login.css";
import { appName, appIconName } from "../../logic/constants";
import {Form, Button, Icon, Header, Segment} from 'semantic-ui-react'

const Login = ({ history }) => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = event => {
        event.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(loggedInuser => {
                console.log(loggedInuser.user);
                setUser({
                    displayName: loggedInuser.user.displayName,
                    uid: loggedInuser.user.uid,
                    photoURL: loggedInuser.user.photoURL
                });
                history.push("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="Login">
            <Segment stacked>
                <Header as="h2">
                    <Icon name={appIconName} /> Login to {appName}
                </Header>
                <Form onSubmit={login}>
                    <Form.Input
                        icon="mail"
                        value={email}
                        iconPosition="left"
                        placeholder="E-mail address"
                        onChange={event => setEmail(event.target.value)}
                    />

                    <Form.Input
                        icon="lock"
                        value={password}
                        iconPosition="left"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />

                    <Button size="large" fluid color="black" type="submit">
                        Login
                    </Button>
                </Form>
            </Segment>
        </div>
    );
};

export default Login;
