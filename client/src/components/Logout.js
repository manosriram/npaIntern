import React, { Component } from "react";
import { Route } from "react-router-dom";
import InsertEr from "./InsertEr";
import InsertOk from "./InsertOk";
import { request } from "https";
const axios = require("axios");

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      message: -1
    };
  }

  componentWillMount() {
    axios
      .post("/auth/logout")
      .then(res => this.setState({ message: res.data.message }, () => {}))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        {this.state.message === 1 && <Route render={props => <InsertOk />} />}
        {this.state.message === 0 && <Route render={props => <InsertEr />} />}
      </div>
    );
  }
}
export default Logout;
