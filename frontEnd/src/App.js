import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/signUp";
import Seller from "./components/Seller";
import UserBooking from "./components/UserBooking";

import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  // i create two state in app component because it the parent of all app
  // and  i need this state in many children so i pass it as props
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState("");
  // here we get the saved token and user type from localStorage if we refresh the page
  // then save it again in the sates
  useEffect(() => {
    if (!token) {
      if (localStorage.getItem("token")) {
        setToken(JSON.parse(localStorage.getItem("token")));
        setUserType(JSON.parse(localStorage.getItem("userType")));
      }
    }
    // eslint-disable-next-line
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
          element={
            <Home token={token} setToken={setToken} setUserType={setUserType} />
          }
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUserType={setUserType} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        {userType === "seller" ? (
          <Route path="/seller" element={<Seller token={token} />} />
        ) : (
          <>
            <Route
              path="/your-booking/:newId"
              element={<UserBooking token={token} />}
            />
            <Route
              path="/your-booking"
              element={<UserBooking token={token} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
