import { Switch, Route } from "react-router-dom";
import React from "react";

function LayoutRoute(props) {
  return (
    <>
      <Switch>
        <Route
          path={props.path}
          exact={props.exact}
          component={props.component}
        />
      </Switch>
    </>
  );
}

export default LayoutRoute;
