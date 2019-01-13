import React, { Component } from "react";
const axios = require("axios");

class NoUser extends Component {
  render() {
    return <h3>No user found with this Email.</h3>;
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: -1
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
        this.setState({ message: res.message }, () => {
          console.log(this.state.message);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Hey there from Login</h2>
        <div className="jumbotron">
          <input
            type="email"
            ref="email"
            id="email"
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
        <div>{this.state.message == 0 && <NoUser />}</div>
      </div>
    );
  }
}

export default Login;
