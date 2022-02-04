import React, { useState ,useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/signUp";
import Seller from "./components/Seller";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (!token){
      if (localStorage.getItem("token")){
        setToken(JSON.parse(localStorage.getItem("token")))
        setUserType(JSON.parse(localStorage.getItem("userType")));
      }
    }
  }, []);
  
  return (
    <div className="App">
      <Navbar
        token={token}
        setToken={setToken}
        userType={userType}
        setUserType={setUserType}
      />
      <Routes>
        <Route
           path="/"
          element={<Home token={token} setToken={setToken} setUserType={setUserType} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUserType={setUserType} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        {userType === "seller" ? (
          <Route path="/seller" element={<Seller token={token} />} />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}

export default App;
