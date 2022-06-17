import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

// SCREENS ARE IMPORTED BELOW
import MainScreen from "./MainScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import LayoutRoute from "./LayoutRoute";
import HomeScreen from "./HomeScreen";
import AddProduct from "./AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainScreen} exact={true} />
        <Route path="/LoginScreen" component={LoginScreen} exact={true} />
        <Route path="/SignupScreen" component={SignupScreen} exact={true} />

        <LayoutRoute path="/HomeScreen" component={HomeScreen} exact={true} />
        <LayoutRoute path="/AddProduct" component={AddProduct} exact={true} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
