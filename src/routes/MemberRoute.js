import React from "react";
import API from "../utils/API.js";
import { Route, Redirect } from "react-router-dom";

export const MemberRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (API.memberIsAuth() === false) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);