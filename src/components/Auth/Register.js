import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import { Header, Button, Icon, Form, Segment } from "semantic-ui-react";
import { appName, appIconName } from "../../logic/constants";
import "./Register.css";
import MessageError from "./MessageError";

const Register = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [photoURLError, setPhotoURLError] = useState("");

  const evaluatePhotoURLError = photoURL => {
    if (!photoURL.length) {
      setPhotoURLError("Avatar URL must be non empty");
    } else {
      setPhotoURLError("");
    }
  };

  const evaluateDisplayNameError = displayName => {
    if (!displayName.length) {
      setDisplayNameError("Display name must be non empty");
    } else {
      setDisplayNameError("");
    }
  };

  const evaluateConfirmedPasswordError = (password, conformedPassword) => {
    if (password.length !== conformedPassword.length) {
      setConfirmedPasswordError("Conformed password is not matched");
    } else {
      setConfirmedPasswordError("");
    }
  };

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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid =
    !emailError &&
    !passwordError &&
    !confirmedPasswordError &&
    !displayNameError &&
    !photoURLError;

  useEffect(() => {
    evaluateEmailError(email);
    evaluatePasswordError(password);
    evaluatePhotoURLError(photoURL);
    evaluateConfirmedPasswordError(password, confirmedPassword);
    evaluateDisplayNameError(displayName);
  }, []); // --- on mount

  const register = evt => {
    evt.preventDefault(); //
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user.updateProfile({ displayName, photoURL }).then(() => {
          console.log(createdUser.user);
          setUser({ displayName, photoURL, uid: createdUser.user.uid });
          history.push("/");
        });
      })
      .catch(err => {
        console.log(`error : ${err}`);
        setFirebaseError(err.message);
      });
  };

  return (
    <div className="Register">
      <div>
        <Segment stacked>
          <Header color="black" as="h2">
            <Icon name={appIconName} /> Register to {appName}
          </Header>
          <Form onSubmit={register}>
            <Form.Input
              icon="user"
              value={displayName}
              iconPosition="left"
              placeholder="Display Name"
              type="text"
              onChange={evt => {
                setDisplayName(evt.target.value);
                evaluateDisplayNameError(evt.target.value);
              }}
            />
            <MessageError error={displayNameError} />
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
            <MessageError error={emailError} />
            <Form.Input
              icon="lock"
              value={password}
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={evt => {
                setPassword(evt.target.value);
                evaluatePasswordError(evt.target.value);
                evaluateConfirmedPasswordError(
                  evt.target.value,
                  confirmedPassword
                );
              }}
            />
            <MessageError error={passwordError} />
            <Form.Input
              icon="lock"
              value={confirmedPassword}
              iconPosition="left"
              placeholder="Confirmed password"
              type="password"
              onChange={evt => {
                setConfirmedPassword(evt.target.value);
                evaluateConfirmedPasswordError(password, evt.target.value);
              }}
            />
            <MessageError error={confirmedPasswordError} />
            <Form.Input
              icon="file image"
              value={photoURL}
              iconPosition="left"
              placeholder="Avatar URL"
              type="url"
              onChange={evt => {
                setPhotoURL(evt.target.value);
                evaluatePhotoURLError(evt.target.value);
              }}
            />
            <MessageError error={photoURLError} />
            <Button
              disabled={!isFormValid}
              size="large"
              fluid
              color="black"
              type="submit"
            >
              Register
            </Button>
            <MessageError error={firebaseError} />
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default Register;
