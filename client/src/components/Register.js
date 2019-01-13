import InsertOk from "./InsertOk";
import InsertEr from "./InsertEr";
import React, { Component } from "react";
const axios = require("axios");

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      contact: -1,
      password: "",
      location: "",
      receivedResponse: null,
      msg: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.gameChanger = this.gameChanger.bind(this);
  }

  gameChanger() {
    axios
      .post("/auth/register", { data: this.state })
      .then(function(res) {
        console.log(res.data);
        if (res.data === 200) alert("Registered Successfully");
        if (res.data === 400) alert("Registered Successfully");
        else alert("Problem!");
      })
      .catch(err => console.log(err));
  }

  handleClick() {
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const contact = this.refs.contact.value;
    const location = this.refs.location.value;

    this.setState({
      name: name,
      email: email,
      password: password,
      contact: contact,
      location: location
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <div>
          <input
            type="text"
            ref="name"
            id=""
            placeholder="Enter Name"
            onChange={this.handleClick}
          />
          <br />
          <br />
          <input
            type="email"
            ref="email"
            id="email"
            placeholder="Enter Email ID"
            onChange={this.handleClick}
          />
          <br />
          <br />
          <input
            type="password"
            ref="password"
            placeholder="Enter Password"
            id="password"
            onChange={this.handleClick}
          />
          <br />
          <br />

          <input
            type="number"
            ref="contact"
            id="contact"
            placeholder="Enter Contact Number"
            minLength="10"
            onChange={this.handleClick}
          />
          <br />
          <br />
          <input
            type="text"
            ref="location"
            id="location"
            placeholder="Enter Location"
            onChange={this.handleClick}
          />
          <br />
          <br />
          <input
            onClick={this.gameChanger}
            className="btn btn-primary"
            type="button"
            value="Submit"
          />
          <br />
          <div>
            {this.state.msg && this.state.msg !== null && <p> 'no'</p>}
            {!this.state.msg && this.state.msg !== null && <p>'ok'</p>}
          </div>
          {/* <div>
            <button className="ui animated button">
              <div className="visible content" />
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Register;
