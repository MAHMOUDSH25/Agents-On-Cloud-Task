import { useState } from "react";
import { Redirect } from "react-router-dom";

function RegistrationScreen({ history }) {
  // formState: (1) initial, (2) loading, (3) validationFailed, (4) successful, (5) unsuccessful
  const [formState, setFormState] = useState("initial");

  let firstNameField;
  let lastNameField;
  let emailField;
  let passwordField;
  let phoneField;

  // FormData is a constructor for creating an object
  // that works like an HTML form element
  const formData = new FormData();

  // errorsState is for tracking the validation errors
  const [errorsState, setErrorsState] = useState([]);

  function registerUser() {
    const errors = [];

    // 1. Validate all of the required fields
    if (firstNameField.value.length === 0) {
      errors.push("Please enter your first name");
    }
    if (lastNameField.value.length === 0) {
      errors.push("Please enter your last name");
    }
    if (emailField.value.length === 0) {
      errors.push("Please enter valid email");
    }
    if (passwordField.value.length === 0) {
      errors.push("Please enter valid password");
    }

    // 1.1 If there are errors, set the state to "validationFailed"
    if (errors.length > 0) {
      setFormState("validationFailed");
      setErrorsState(errors);
    }

    // 1.2 If there are no errors, set the state to "loading"
    else {
      setFormState("loading");
      setErrorsState([]);

      formData.append("firstName", firstNameField.value);
      formData.append("lastName", lastNameField.value);
      formData.append("email", emailField.value);
      formData.append("password", passwordField.value);
      formData.append("phone", phoneField.value);

      fetch(`${process.env.REACT_APP_BACKEND}/users/register`, {
        method: "POST",
        body: formData,
      })
        // The .json() method will convert a 'stringified' object to a JavaScript object
        .then((backendResponseJson) => backendResponseJson.json())
        // 2.1 If the submission is successful, set state to "successful"
        .then((backendResponse) => {
          if (backendResponse.message === "User created") {
            setFormState("successful");
          } else {
            setFormState("unsuccessful");
          }
        })
        // 2.2 If the submission is successful, set state to "unsucessful"
        .catch((err) => {
          console.log(err);
          setFormState("unsuccessful");
        });
    }
  }

  if (formState === "successful") {
    return <Redirect to="/HomeScreen" />;
  } else {
    // errorState
    return (
      <div
        className="container"
        style={{ "margin-top": "5em", "max-width": "40em" }}
      >
        <h1>Sign-up to Agents on cloud</h1>
        <br />

        <label>Enter your firstname *</label>
        <input
          ref={function (theInputElement) {
            firstNameField = theInputElement;
          }}
          className="field form-control"
          name="firstName"
          type="text"
        />

        <label>Enter your lastname *</label>
        <input
          ref={function (thisInputField) {
            lastNameField = thisInputField;
          }}
          className="field form-control"
          name="lastName"
          type="text"
        />

        <label>Enter your email *</label>
        <input
          ref={function (thisInputField) {
            emailField = thisInputField;
          }}
          className="field form-control"
          name="email"
          type="text"
        />

        <label>Enter a password *</label>
        <input
          ref={function (thisInputField) {
            passwordField = thisInputField;
          }}
          className="field form-control"
          name="password"
          autocomplete="off"
          type="password"
        />

        <label>Enter your phone (optional)</label>
        <input
          ref={function (thisInputField) {
            phoneField = thisInputField;
          }}
          className="field form-control"
          name="phone"
          type="text"
        />

        <br />

        {formState !== "loading" && (
          <div>
            <button
              onClick={registerUser}
              className="btn btn-primary"
              style={{ padding: "10px", "font-size": "16px" }}
            >
              Submit
            </button>
            <br />
            <br />
          </div>
        )}

        {formState === "validationFailed" && (
          <div className="alert alert-danger">
            <ul>
              {errorsState.map((error) => {
                return <li>{error}</li>;
              })}
            </ul>
          </div>
        )}

        {formState === "successful" && (
          <div className="alert alert-success">
            You have a successfully created an account
          </div>
        )}

        {formState === "unsuccessful" && (
          <div className="alert alert-danger">
            An error occured. Please try again.
          </div>
        )}

        {formState === "loading" && <p>Loading...</p>}
      </div>
    );
  }
}

export default RegistrationScreen;
