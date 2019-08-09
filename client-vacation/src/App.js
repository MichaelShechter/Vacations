import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import NavBar from "./Components/Layout/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Components/Register/Register";
import Vacations from "./Components/Vacations/Vacations";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import store from "./Components/store";
import AddVacation from "./Components/Vacations/AddVacation";
import Alerts from "./Components/Layout/Alerts";

import PrivateRoute from "./Components/routing/PrivateRoute";
import Chart from "./Components/Chart/Chart";
import { loadUser } from "./actions/authAction";

class App extends Component {
  render() {
    loadUser(localStorage.token);

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar title={"Vacations"} />
          </div>
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
            <PrivateRoute exact path={"/addvacation"} component={AddVacation} />
            <PrivateRoute exact path="/" component={Vacations} />
            <Route exact path={"/alert"} component={Alerts} />
            <PrivateRoute exact path={"/chart"} component={Chart} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
