import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {  RiLoginBoxLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import "./style.css";

export default function Navbar({ token, setToken, userType, setUserType }) {
  const [checked, setChecked] = useState(false);
  const Navigate = useNavigate();
  return (
    <div className="nav-container">
      <nav className="navbar-container">
        <div className="navbar-content">
          <div
            className="web-name-app"
            onClick={() => {
              Navigate("/");
            }}
          >
            <p id="booking">Booking App</p>
          </div>
          <div className="ul-navbar">
            <input
              type="checkbox"
              id="check"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
            <label
              htmlFor="check"
              className="checkbtn"
              onChange={() => {
                setChecked(!checked);
              }}
            >
              <FaBars />
            </label>
            <ul className="ul-nav">
              <li>
                <AiOutlineHome
                  title="Home"
                  className="navbar_icon-FA"
                  size={35}
                  color="white"
                  onClick={() => {
                    setChecked(false);
                    Navigate("/");
                  }}
                />
              </li>
              {!token ? (
                <li>
                  <RiLoginBoxLine
                    title="Login"
                    className="navbar_icon-FA"
                    size={35}
                    color="white"
                    onClick={() => {
                      setChecked(false);
                      Navigate("/login");
                    }}
                  />
                </li>
              ) : (
                ""
              )}
              {token ? (
                <li>
                  <CgProfile
                    title="Profile"
                    className="navbar_icon-FA"
                    size={35}
                    color="white"
                    onClick={() => {
                      setChecked(false);
                      if (userType === "seller") Navigate("/seller");
                      else Navigate("/your-booking");
                    }}
                  />
                </li>
              ) : (
                ""
              )}
              {token ? (
                <li>
                  <IoLogOutOutline
                    title="Sign out"
                    className="navbar_icon-FA"
                    size={35}
                    color="white"
                    onClick={() => {
                      setChecked(false);
                      setToken("");
                      setUserType("");
                      Navigate("/");
                    }}
                    style={{ textDecoration: "none" }}
                  />
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
