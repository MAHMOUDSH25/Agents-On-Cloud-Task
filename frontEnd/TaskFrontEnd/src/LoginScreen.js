import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// Connect to the context (i.e, global state)
import { Context as UserContext } from "./UserContext";

function LoginScreen() {
  // "initial", "sending", "successful", "unsuccessful", "validation failed"
  const [state, setState] = useState("initial");
  const { setUserState } = useContext(UserContext);

  const [cartIsEmpty] = useState(false);

  // Declare undefined variables for later assignment (ref props)
  let emailField;
  let passwordField;

  // To instantiate a FormData object
  const formData = new FormData();

  const login = () => {
    const errors = [];

    // 1. Validate the fields
    if (emailField.value.length === 0) {
      errors.push("Please enter a valid email address");
    }
    if (passwordField.value.length === 0) {
      errors.push("Please enter a valid password");
    }

    // 1.1 If there are errors, set the state to "validation error"
    if (errors.length > 0) {
      setState("validation error");
    }
    // 1.2 If there are no errors, set the state to "sending"
    else {
      setState("sending");

      formData.append("email", emailField.value);
      formData.append("password", passwordField.value);

      fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
        method: "POST",
        // headers: {"Content-Type": "application/json"},
        body: formData,
      })
        // 2.1 If the submission is successful, set the state "successful"
        .then(function (backendResponse) {
          return backendResponse.json();
        })
        .then((theJson) => {
          if (theJson.message.email) {
            setUserState({
              jsonwebtoken: theJson.message.jsonwebtoken,
              firstName: theJson.message.firstName,
              lastName: theJson.message.lastName,
              email: theJson.message.email,
              avatar: theJson.message.avatar,
              loginStatus: true,
            });
            setState("successful");
          } else if (theJson.message === "Wrong email or password") {
            setState("validation error");
          } else {
            setState("unsuccessful");
          }
        })
        // 2.2 If the submission is unsuccessful, set the state "unsuccessful"
        .catch((error) => {
          console.log(error);
          setState("unsuccessful");
        });
    }
  };

  if (state === "successful") {
    return <Redirect to="/HomeScreen" />;
  } else {
    return (
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 className="py-5">Login to Agents on cloud</h1>

        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            ref={(elem) => (emailField = elem)}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            ref={(elem) => (passwordField = elem)}
            type="password"
            className="form-control"
            id="password"
            aria-describedby="password"
          />
        </div>

        {state !== "sending" && state !== "successful" && (
          <button
            onClick={login}
            className="btn btn-primary mb-3"
            type="button"
          >
            Submit
          </button>
        )}

        {state === "validation error" && (
          <div className="alert alert-danger" role="alert">
            Incorrect email or password.
          </div>
        )}

        {state === "unsuccessful" && (
          <div className="alert alert-danger" role="alert">
            Internal error. Please try again later.
          </div>
        )}

        {state === "sending" && <p>Loading...</p>}
      </div>
    );
  }
}

export default LoginScreen;
