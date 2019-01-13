import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import React, { Component } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
const axios = require("axios");

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    axios
      .post("/auth/logout")
      .then(res =>
        this.setState({ message: res }, () => {
          console.log(res);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Navbar className="nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/login">
              Login
            </NavItem>
            <NavItem eventKey={2} href="/register">
              Register
            </NavItem>
            <NavItem eventKey={3} href="/logout" onClick={this.logOut}>
              Logout
            </NavItem>
          </Nav>
        </Navbar>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
