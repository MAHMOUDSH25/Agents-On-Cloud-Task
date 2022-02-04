import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import "./style.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputType, setInputType] = useState("password");

  const Navigate = useNavigate();



  const triggerPasswordType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeType = (e) => {
    setUserType(e.target.value);
  };
  const chickSignUp = async () => {
    try {
      setErrorMessage("");
      const res = await axios.post("http://localhost:5000/signUp", {
        name,
        email,
        password,
        type: userType,
      });
      if (res.status === 201) {
        Navigate("/login");
      }
    } catch (err) {
      if (err.response.status === 404) {
        setErrorMessage("you enter a wrong Email");
      } else if (err.response.status === 403) {
        setErrorMessage("you enter a wrong Password");
      }
    }
  };

  return (
    <div className="signUp-container">
      <div className="signUp-content">
        <div>
          <input type="text" placeholder="name" onChange={changeName} />
        </div>
        <div>
          <input type="email" placeholder="email" onChange={changeEmail} />
        </div>
        <div className="signUp-password-div">
          <input
            type={inputType}
            placeholder="password"
            onChange={changePassword}
          />
          <BiShow
            onClick={triggerPasswordType}
            className="signUp-show-password"
            title={inputType === "password" ? "show password" : "hide password"}
          />
        </div>
        <div>
          <div id="userType">
            <select name="userType" id="userTypeSelect" onChange={changeType}>
              <option value="">you Are ?</option>
              <option value="buyer">buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
        </div>
        <div>
          <button className="signUp-button" onClick={chickSignUp}>
            SignUp
          </button>
        </div>
        {/* {errorMessage ? <h3>{errorMessage}</h3> : ""} */}
        <h3>{errorMessage}</h3>
        <h3>
          You have already an account? <Link to="/login">Login</Link>
        </h3>
      </div>
    </div>
  );
}
