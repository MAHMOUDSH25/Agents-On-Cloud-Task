import { useState } from "react";
import { Redirect } from "react-router-dom";

function AddProduct({ history }) {
  // formState: (1) initial, (2) loading, (3) validationFailed, (4) successful, (5) unsuccessful
  const [formState, setFormState] = useState("initial");

  let NameField;
  let DescriptionField;
  let ImageField;

  // FormData is a constructor for creating an object
  // that works like an HTML form element
  const formData = new FormData();

  // errorsState is for tracking the validation errors
  const [errorsState, setErrorsState] = useState([]);

  // attachFile() will append to formData the avatar file
  const attachFile = (evt) => {
    // Create an array from the file attachments
    const files = Array.from(evt.target.files);

    // For each attachment, append the file to formData
    files.forEach((fileAttachment, index) => {
      console.log("hre");
      formData.append(index, fileAttachment);
    });
  };

  function registerProduct() {
    const errors = [];

    // 1. Validate all of the required fields
    if (NameField.value.length === 0) {
      errors.push("Please enter the Product Name");
    }
    if (DescriptionField.value.length === 0) {
      errors.push("Please enter the product Description");
    }
    if (ImageField.value.length === 0) {
      errors.push("Please enter Product Image");
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

      formData.append("name", NameField.value);
      formData.append("description", DescriptionField.value);
      formData.append("image", ImageField.value);

      fetch(`${process.env.REACT_APP_BACKEND}/product/addProduct`, {
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
        <h1>Add A Product to the Website</h1>
        <br />

        <label>Enter Product Name *</label>
        <input
          ref={function (theInputElement) {
            NameField = theInputElement;
          }}
          className="field form-control"
          name="firstName"
          type="text"
        />

        <label>Description *</label>
        <input
          ref={function (thisInputField) {
            DescriptionField = thisInputField;
          }}
          className="field form-control"
          name="lastName"
          type="text"
        />

        <br />

        <label>Upload a picture of the product *</label>
        <input
          ref={(element) => {
            ImageField = element;
          }}
          onChange={attachFile}
          onClick={(evt) => {
            evt.target.value = null;
          }}
          className="field form-control"
          id="photo"
          name="file"
          type="file"
          multiple="multiple"
        />
        <br />
        <br />
        {formState !== "loading" && (
          <div>
            <button
              onClick={registerProduct}
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

        {formState === "unsuccessful" && (
          <div className="alert alert-success">
            Product Added to the DataBase
          </div>
        )}

        <a href="/HomeScreen">
          {" "}
          <button
            className="btn btn-success px-2"
            style={{
              padding: "5px",
              "font-size": "20px",
              "font-weight": "bold",
            }}
          >
            Home
          </button>{" "}
        </a>

        {formState === "loading" && <p>Loading...</p>}
      </div>
    );
  }
}

export default AddProduct;
