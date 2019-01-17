import React, { Component } from "react";
import InsertEr from "./InsertEr";
import { Route } from "react-router-dom";
import InsertOk from "./InsertOk";
const axios = require("axios");

class ShowAll extends Component {
  constructor() {
    super();
    this.state = {};
    this.showContacts = this.showContacts.bind(this);
  }

  showContacts() {
    axios
      .post(`/contacts/getAllContacts/${this.props.name}`)
      .then(res => res.json(res))
      .then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <button onClick={this.showContacts} class="btn btn-primary">
          Show All Contacts.{" "}
        </button>
      </div>
    );
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: -1,
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  changeData() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.setState({
      email: email,
      password: password
    });
  }

  handleClick() {
    this.setState({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
    axios
      .post("/auth/login", { data: this.state })
      .then(res =>
        this.setState(
          { message: res.data.message, name: res.data.name },
          () => {
            console.log(this.state);
          }
        )
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Hey there from Login</h2>
        <div className="jumbotron">
          <div className="container">
            <input
              type="email"
              ref="email"
              id="exampleInputEmail1"
              placeholder="Enter Email ID"
              onChange={this.changeData}
            />
            <br />
            <br />
            <input
              type="password"
              ref="password"
              placeholder="Enter Password"
              id="password"
              onChange={this.changeData}
            />
            <br />
            <br />
            <input
              onClick={this.handleClick}
              className="btn btn-primary"
              type="button"
              value="Submit"
            />
          </div>
        </div>

        {this.state.message === 1 && <Route render={props => <InsertOk />} />}
        {this.state.message === 0 && <Route render={props => <InsertEr />} />}
        {/* <App name={this.state.name} /> */}
        {this.state.message === 1 && (
          <Route render={props => <ShowAll name={this.state.name} />} />
        )}
      </div>
    );
  }
}

export default Login;
