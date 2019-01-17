import React, { Component } from "react";
const axios = require("axios");

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    axios.get("/findContact/:");
  }

  render() {
    return (
      <div>
        <h1>Hello From Profile!!</h1>
      </div>
    );
  }
}

export default Profile;
