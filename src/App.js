import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./components/Login.js";
import { BenevoleLogin } from "./components/BenevoleLogin.js";
import { Register } from "./components/Register.js";
import { PrivateRoute } from "./routes/PrivateRoute.js";
import { MemberRoute } from "./routes/MemberRoute.js";
import { AdminRoute } from "./routes/AdminRoute.js";
import { Dash } from "./components/Dashboard"; 
import { Main } from "./components/Main";
import { Profil } from "./components/Profil";
import { Donation } from "./components/Donation";
import { Forming } from "./components/Forming";
import { Partnership } from "./components/Partnership";
import "./App.css";
import { GreenArea } from "./components/GreenArea.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <MemberRoute exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/benevolelogin" component={BenevoleLogin} />
            <Route exact path="/" component={Main} />
            <Route exact path="/welcome" component={Main} />
            <Route exact path="/donation" component={Donation} />
            <Route exact path="/forming" component={Forming} />
            <Route exact path="/partnership" component={Partnership} />
            <Route exact path="/greenarea" component={GreenArea} />
            <PrivateRoute exact path="/profil" component={Profil} />
            <AdminRoute exact path="/dashbord" component={Dash} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;