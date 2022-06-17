import React from "react";
import "./style.css";

function MainScreen() {
  return (
    <>
      <div className="header">
        <header className="p-3 bg-dark text-white ">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <div className="align-items-center text-end col-8">
                <a href="LoginScreen">
                  {" "}
                  <button className="btn btn-primary btn-md px-5 gap-3 me-5">
                    Login
                  </button>
                </a>
                <a href="SignupScreen">
                  {" "}
                  <button className="btn btn-outline-warning btn-md px-5 gap-3 me-5">
                    SignUp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </header>
        <h1 className="text-center">
          Hi and Welcome to
          <br />
          Agents Cloud
        </h1>
      </div>
    </>
  );
}

export default MainScreen;
