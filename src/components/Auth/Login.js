import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import { appName, appIconName } from "../../logic/constants";
import MessageError from './MessageError'
import {
  Header,
  Button,
  Icon,
  Form,
  Segment ,
  Message
} from "semantic-ui-react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const isFormValid = !emailError && !passwordError ;

  const evaluateEmailError = email => {
    if (!email.length) {
      setEmailError("Email must be non empty");
    } else {
      setEmailError("");
    }
  };

  const evaluatePasswordError = password => {
    if (!password.length) {
      setPasswordError("Password must be non empty");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    evaluateEmailError(email);
    evaluatePasswordError(password);
  }, []);// --- on mount

  const login = event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedinUser => {
        console.log(loggedinUser.user);
        setUser({
          displayName: loggedinUser.user.displayName,
          uid: loggedinUser.user.uid,
          photoURL: loggedinUser.user.photoURL
        });
        history.push("/");
      })
      .catch(err => {
        console.log(err);
        setFirebaseError(err.message);
      });
  };

  return (
    <div className="Login">
      <div>
        <Segment stacked>
          <Header color="black" as="h2">
            <Icon name={appIconName} /> Login to {appName}
          </Header>
          <Form onSubmit={login}>
            <Form.Input
              icon="mail"
              value={email}
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              onChange={evt => {
                setEmail(evt.target.value);
                evaluateEmailError(evt.target.value);
              }}
            />
            <MessageError error={emailError}/>
            
            <Form.Input
              icon="lock"
              value={password}
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={evt => {
                setPassword(evt.target.value);
                evaluatePasswordError(evt.target.value);
              }}
            />
            <MessageError error={passwordError}/>
            <Button
              disabled={!isFormValid}
              size="large"
              fluid
              color="black"
              type="submit"
            >
              Login
            </Button>
            <MessageError error={firebaseError}/>
          </Form>
        </Segment>
        <Message>
          New to us ? <Link to="/Register">Register</Link>
        </Message>
      </div>
    </div>
  );
};

export default Login;
