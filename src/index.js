import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "./layout/Admin";
import LoginPage from "./views/LoginPage/LoginPage";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
const isAuth = localStorage.getItem("isAuth");

ReactDOM.render(
  <Router history={hist}>
      { isAuth
          ?
          <Switch>
              <Route path="/admin" component={Admin}/>
              <Redirect from="/" to="/admin/dashboard"/>
          </Switch>
          :
          <Switch>
              <Route path="/login" component={LoginPage}/>
              <Redirect from="/" to="/login"/>
          </Switch>
      }
  </Router>,
  document.getElementById("root")
);
