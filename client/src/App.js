import React, { Component } from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ContactList from "./components/ContactList";
const axios = require("axios");

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: -1,
      student: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleClick() {
    axios
      .get(`/contacts/findContact/${this.refs.search.value}`)
      .then(res =>
        this.setState(
          { student: res.data.students, message: res.data.message },
          () => {
            console.log(this.state);
          }
        )
      )
      .catch(err => console.log(err));
  }

  logOut() {
    axios
      .post("/auth/logout")
      .then(res =>
        this.setState({ message: res.data.message }, () => {
          console.log(this.state);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={this.logOut}
              >
                Logout
              </button>
            </ul>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              ref="search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={this.handleClick}
            >
              Search
            </button>
          </div>
        </nav>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contactList" component={ContactList} />
            {this.state.message === 1 && (
              <Route
                render={props => <ContactList data={this.state.student} />}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
