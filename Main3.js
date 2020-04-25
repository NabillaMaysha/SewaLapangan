import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//Load Navbar
import Navbar from "./page3/Navbar";
//Load halaman
import Login from "./page3/Login";
import Register from "./page3/Register";
import User from "./page3/User";
import Lapangan from "./page3/Lapangan";
import Client from "./page3/Client";
import Sewa from "./page3/Sewa";
import History from "./page3/History";
import Profil from "./page3/Profil";


class Main2 extends Component {
  render = () => {
    return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route path="/user">
        <Navbar />
        <User />
      </Route>

      <Route path="/lapangan">
        <Navbar />
        <Lapangan />
      </Route>

      <Route path="/client">
        <Navbar />
        <Client />
      </Route>

      <Route path="/sewa">
        <Navbar />
        <Sewa />
      </Route>

      <Route path="/history">
        <Navbar />
        <History />
      </Route>

      <Route path="/profil">
        <Navbar />
        <Profil />
      </Route>

    </Switch>
    );
  }
}
export default Main2;
