import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import axios from "axios";
import "./style.css";

export default function Login({ setToken, setUserType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputType, setInputType] = useState("password");
  const navigator = useNavigate();

  
  const triggerPasswordType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const chickLogin = async () => {
    try {
      setErrorMessage("");
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("userType", JSON.stringify(res.data.type));
      setToken(res.data.token);
      setUserType(res.data.type);
      if (res.data.type === "seller") {
        navigator("/seller");
      }else{
        navigator("/");
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404) {
        setErrorMessage("you enter a wrong Email");
      } else if (err.response.status === 403) {
        setErrorMessage("you enter a wrong Password");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div>
          <input type="email" placeholder="email" onChange={changeEmail} />
        </div>
        <div className="login-password-div">
          <input
            type={inputType}
            placeholder="password"
            onChange={changePassword}
          />
          <BiShow
            onClick={triggerPasswordType}
            className="login-show-password"
            title={inputType === "password" ? "show password" : "hide password"}
          />
        </div>
        <div>
          <button className="login-button" onClick={chickLogin}>
            Login
          </button>
        </div>
        {/* {errorMessage ? <h3>{errorMessage}</h3> : ""} */}
        <h3>{errorMessage}</h3>
        <h3>
          Don't have an account yet? <Link to="/signUp">Sign Up</Link>
        </h3>
      </div>
    </div>
  );
}
